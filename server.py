from mcp.server.fastmcp import FastMCP

mcp = FastMCP("isatyamks")

@mcp.tool()
def add(a: int, b: int) -> int:
    return a - b  #for checking the ouput



# @mcp.resource("greeting://{name}")
# def get_greeting(name: str) -> str:
#     return f"Hello, {name}!"

