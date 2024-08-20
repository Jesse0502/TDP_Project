Make sure you are using python version (3.12.5) and install virualenv first by running pip install virtualenv before going forward with the steps.

Step 1
`python -m virtualenv venv`
Step 2
`venv/scripts/activate`
Step 3
`pip install fastapi uvicorn[standard] google-generativeai`
Step 4
`uvicorn main:app --reload`

After all the steps don't forget to rename .env.example to .env after putting all the values!
