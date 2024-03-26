import re
import shutil
import subprocess
import tempfile
from collections.abc import Iterator
from pathlib import Path

import pytest

commit_pattern = re.compile(r"_commit: .*")
src_path_pattern = re.compile(r"_src_path: .*")
tests_path = Path(__file__).parent
root = tests_path.parent
generated_folder = "examples/cloud_provider"
# specific answer combination
generated_root = root / generated_folder

config_path = Path(__file__).parent.parent / "pyproject.toml"
LINT_ARGS = ["algokit", "project", "run", "lint"]
BUILD_ARGS = ["algokit", "project", "run", "build"]
TEST_ARGS = ["algokit", "project", "run", "test"]


def _generate_default_parameters(
    *, preset_name: str, cloud_provider: str = "none"
) -> dict[str, str]:
    return {
        "author_name": "None",
        "author_email": "None",
        "preset_name": preset_name,
        "cloud_provider": cloud_provider,
    }


@pytest.fixture(autouse=True, scope="module")
def working_dir(custom_subdir: str = "template") -> Iterator[Path]:
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as temp:
        working_dir_path = Path(temp) / custom_subdir
        working_generated_root = working_dir_path / generated_folder
        shutil.copytree(root, working_dir_path)
        subprocess.run(["git", "add", "-A"], cwd=working_dir_path)
        subprocess.run(
            ["git", "commit", "-m", "draft changes", "--no-verify"],
            cwd=working_dir_path,
        )

        yield working_dir_path

        for src_dir in working_generated_root.iterdir():
            if not src_dir.is_dir():
                continue

            dest_dir = generated_root / src_dir.stem
            shutil.rmtree(dest_dir, ignore_errors=True)
            shutil.copytree(src_dir, dest_dir, dirs_exist_ok=True)


def run_init(
    working_dir: Path,
    test_name: str,
    *args: str,
    template_url: str | None = None,
    template_branch: str | None = None,
    answers: dict[str, str] | None = None,
    custom_check_args: list[list[str]] | None = None,
) -> subprocess.CompletedProcess:
    copy_to = working_dir / generated_folder / test_name
    shutil.rmtree(copy_to, ignore_errors=True)
    if template_url is None:
        template_url = str(working_dir)

        if template_branch is None:
            git_output = subprocess.run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=working_dir,
                stdout=subprocess.PIPE,
            )
            template_branch = git_output.stdout.decode("utf-8").strip()

    init_args = [
        "algokit",
        "--verbose",
        "init",
        "--name",
        str(copy_to.stem),
        "--template-url",
        template_url,
        "--UNSAFE-SECURITY-accept-template-url",
        "--defaults",
        "--no-ide",
        "--no-git",
        "--no-workspace",
    ]
    answers = {
        **(answers or {}),
    }

    for question, answer in answers.items():
        init_args.extend(["-a", question, str(answer)])
    if template_branch:
        init_args.extend(["--template-url-ref", template_branch])
    init_args.extend(args)

    result = subprocess.run(
        init_args,
        input="y",  # acknowledge that input is not a tty
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        cwd=copy_to.parent,
    )

    if result.returncode:
        return result
    # if successful, normalize .copier-answers.yml to make observing diffs easier
    copier_answers = Path(copy_to / ".copier-answers.yml")
    content = copier_answers.read_text("utf-8")
    content = commit_pattern.sub("_commit: <commit>", content)
    content = src_path_pattern.sub("_src_path: <src>", content)
    copier_answers.write_text(content, "utf-8")

    if custom_check_args:
        for check_args in custom_check_args:
            result = subprocess.run(
                check_args,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                cwd=copy_to,
            )
            if result.returncode:
                break

    # remove node_modules
    shutil.rmtree(copy_to / "node_modules", ignore_errors=True)

    # Check if .idea folder exists and if so modify os specific SDK_HOME path
    idea_folder = copy_to / ".idea"
    if idea_folder.exists():
        # Iterate over all files in .idea/runConfigurations
        for file in (idea_folder / "runConfigurations").iterdir():
            # Read the file content
            content = file.read_text()
            # Replace the line containing SDK_HOME
            content = re.sub(
                r'<option name="SDK_HOME" value=".*" />',
                '<option name="SDK_HOME" value="$PROJECT_DIR$/.venv/bin/python" />',
                content,
            )
            # Write the modified content back to the file
            file.write_text(content)
    return result


# Below places the artifacts to examples/misc folder to separate from default
# preset tests
@pytest.mark.parametrize("cloud_provider", ["vercel", "netlify"])
def test_production_react_cloud(working_dir: Path, cloud_provider: str) -> None:

    response = run_init(
        working_dir,
        f"production_react_{cloud_provider}",
        answers=_generate_default_parameters(
            preset_name="production", cloud_provider=cloud_provider
        ),
        custom_check_args=[BUILD_ARGS, TEST_ARGS, LINT_ARGS],
    )

    assert response.returncode == 0, response.stdout
