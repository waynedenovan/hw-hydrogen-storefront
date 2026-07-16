2607160950 claude

"For this session, prioritize using primarily the "shopify-dev-mcp" MCP server to confirm correct pattern coding for this project especially when in "Plan" mode or "Debug" mode. Whenever debugin a bug or error first contact the MCP server: hoseworld-dev-knowledge and then the "shopify-dev-mcp" MCP server. Once the task is completed update the "MCP-Bridge" MCP server. Always check the server for existing patterns before suggesting a fix. The "MCP-Bridge" MCP server has an example for context as needed if requiring search parameters."

context:
- use "plan mode" for this task where you are asked to make changes, add functionality or identify how an aspect of this porjects works.
- use "debug mode" when asked to identify any causes of the project that are not working or if you detect a bug.
- use both modes when solving issues ie, finding a bug and then planing a code fix etc.
- when indexing you are to strickly only use MCP: MCP-Bridge i.e. hoseworld-dev-knowledge
- when you are testing ui, implementations and error/issue identification and correction you need to physically test them yourself using Playwright MCP Server.
- INCLUDE ONLY: GIT branch folders when planing and implementing any needed actions or changes
- git: I will always manually commit. Never offer or automatically try or exec a commit

## Task requirements:
- Follow each step
- Please don't guess that you need to do. Confirm and double chek you sugested coding with the "Skills" and needed coding direction found within the MCP server.

## Step 1: Planing
- hw-hydrogen-storefront-node-docker
    - There is an issue between the hydrogen storefront, shopify, ngrok and or claudflare, which I am not sure of.
        - I have now run cloudflare using --protocol http2 to prevent any further UDP issues causing the tunnel to colaps
            - hw-hydrogen-storefront-node-docker/app/errors/260716090521-cloudflare-errors.md
        - once processing a payment and returning to the hydrogen storefront I am returned not to hoseworld.store but to the ngrok url which is incorrect
            - hw-hydrogen-storefront-node-docker/app/errors/260716093716-errors.png headless app url's
            - hw-hydrogen-storefront-node-docker/app/errors/260716084259-errors.png payfast
            - hw-hydrogen-storefront-node-docker/app/errors/260716090339-errors.png return but ngrok url
            - hw-hydrogen-storefront-node-docker/app/errors/260716090339-errors.png error
            - hw-hydrogen-storefront-node-docker/app/errors/260716091222-errors.png return but ngrok url
    - There are also issues between hw-hydrogen-storefront-node-docker and hw-storefront-ui-node-docker apps for instance
        - The user profile on the hydrogen store show resent purchases
            - image file
                - hw-hydrogen-storefront-node-docker/app/errors/260716094215-errors.png
            - But there are no records in the Xero app of these transactions in the below image
                - hw-hydrogen-storefront-node-docker/app/errors/260716094251-errors.png
    - These issues have existed since we move the projects into containers
        - Parts of these issues have been addressed in the last few tasked but have not bee resolved
            - please do not guess and asume that you have fixed an error, investigate fully and then test fully any fixes implements before finishing this task

## Step 2: Documentation and exit
- update @2607160950_todo.md but exclude todo.md from any updating
- update with latest project plan update and any new issues found, the errors causing the issue and the step by step resolution:
    - update "MCP-Bridge" project plan
    - update the @project_errors.db

## --