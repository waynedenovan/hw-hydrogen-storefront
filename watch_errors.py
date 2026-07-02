import sys
import os
from datetime import datetime

ERROR_DIR = "./app/errors"
os.makedirs(ERROR_DIR, exist_ok=True)

def save_error_to_md(error_text):
    timestamp = datetime.now().strftime("%d%m%y%H%M%S")
    filepath = os.path.join(ERROR_DIR, f"{timestamp}_errors.md")
    
    # Built as a list of individual lines to prevent copy-paste text formatting syntax errors
    lines = [
        "# Dev Server Error Detected",
        "",
        f"**Timestamp:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "**Command:** `shopify hydrogen preview --port 5130`",
        "",
        "## Captured Error Payload",
        "```text",
        error_text.strip(),
        "```",
        "",
        "## Prompt Instruction",
        "Please examine the traceback information provided above. Determine why this route/asset fails on the Hydrogen framework server and output a succinct, copy-pasteable bugfix strategy."
    ]
    md_content = "\n".join(lines)
    
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(md_content)
        print(f"\n🤖 [Automator] Error saved to: {filepath}\n", flush=True)
    except Exception as e:
        print(f"\n[Automator] Failed to save error: {e}\n", flush=True)

def monitor():
    in_error = False
    error_lines = []
    
    for line in sys.stdin:
        sys.stdout.write(line)
        sys.stdout.flush()
        cleaned_line = line.strip()
        
        if cleaned_line.startswith("Error:") or "new Error(" in cleaned_line:
            if in_error and error_lines: save_error_to_md("".join(error_lines))
            in_error = True
            error_lines = [line]
            continue

        if in_error:
            if cleaned_line.startswith("at ") or cleaned_line == "^" or not cleaned_line:
                error_lines.append(line)
            else:
                if error_lines: save_error_to_md("".join(error_lines))
                in_error = False
                error_lines = []

    if in_error and error_lines: save_error_to_md("".join(error_lines))

if __name__ == "__main__":
    monitor()