# test_recursion.py
def recursive_function():
    return recursive_function()

try:
    recursive_function()
except RecursionError as e:
    print("Caught RecursionError:", e)