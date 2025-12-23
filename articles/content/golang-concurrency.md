
# Concurrency in Golang

Golang revolutionized programming with its CSP (Communicating Sequential Processes) concurrency model.

## Goroutines

Goroutines are lightweight threads managed by the Go runtime.

```go
go func() {
    fmt.Println("Hello from Goroutine")
}()
```

## Channels

Channels are a safe way to exchange data between goroutines.
