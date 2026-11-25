import sys


def main():
    message = sys.stdin.readline().strip()

    print(f"Python received: {message}", flush=True)


if __name__ == "__main__":
    main()