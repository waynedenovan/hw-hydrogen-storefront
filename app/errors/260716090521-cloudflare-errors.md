server running UTC time and not +2 hrs for Johannesburg
2026-07-15T18:23:30Z INF precheck complete hard_fail=false run_id=3b1397c7-9421-40d0-8745-a18cf42f5fdc suggested_protocol=quic
2026-07-16T07:04:26Z ERR failed to serve incoming request error="Error shutting down control stream: context canceled"
2026-07-16T07:04:26Z ERR failed to serve incoming request error="Error shutting down control stream: client disconnected"
2026-07-16T07:04:26Z WRN Serve tunnel error error="Error shutting down control stream: context canceled" connIndex=0 event=0 ip=198.41.192.47
2026-07-16T07:04:26Z ERR failed to serve incoming request error="Error shutting down control stream: context canceled"
2026-07-16T07:04:26Z INF Retrying connection in up to 1s connIndex=0 event=0 ip=198.41.192.47
2026-07-16T07:04:26Z ERR failed to serve incoming request error="Error shutting down control stream: client disconnected"
2026-07-16T07:04:26Z ERR Serve tunnel error error="Error shutting down control stream: client disconnected" connIndex=1 event=0 ip=198.41.200.193
2026-07-16T07:04:26Z INF Retrying connection in up to 1s connIndex=1 event=0 ip=198.41.200.193
2026-07-16T07:04:26Z ERR Serve tunnel error error="Error shutting down control stream: context canceled" connIndex=2 event=0 ip=198.41.200.13
2026-07-16T07:04:26Z INF Retrying connection in up to 1s connIndex=2 event=0 ip=198.41.200.13
2026-07-16T07:04:26Z ERR Serve tunnel error error="Error shutting down control stream: client disconnected" connIndex=3 event=0 ip=198.41.192.227
2026-07-16T07:04:26Z INF Retrying connection in up to 1s connIndex=3 event=0 ip=198.41.192.227
2026-07-16T07:04:26Z ERR Connection terminated error="Error shutting down control stream: client disconnected" connIndex=3
2026-07-16T07:04:27Z ERR Connection terminated error="Error shutting down control stream: context canceled" connIndex=0
2026-07-16T07:04:27Z ERR Connection terminated error="Error shutting down control stream: client disconnected" connIndex=1
2026-07-16T07:04:28Z ERR Connection terminated error="Error shutting down control stream: context canceled" connIndex=2
2026-07-16T07:04:39Z INF Tunnel connection curve preferences: [X25519MLKEM768 CurveID(65074) CurveP256] connIndex=2 event=0 ip=198.41.200.13
2026-07-16T07:04:39Z INF Tunnel connection curve preferences: [X25519MLKEM768 CurveID(65074) CurveP256] connIndex=3 event=0 ip=198.41.192.227
2026-07-16T07:04:39Z INF Tunnel connection curve preferences: [X25519MLKEM768 CurveID(65074) CurveP256] connIndex=1 event=0 ip=198.41.200.193
2026-07-16T07:04:39Z INF Tunnel connection curve preferences: [X25519MLKEM768 CurveID(65074) CurveP256] connIndex=0 event=0 ip=198.41.192.47
2026-07-16T07:04:39Z INF Registered tunnel connection connIndex=3 connection=cc3a39dc-f518-486d-8875-4e43122741a2 event=0 ip=198.41.192.227 location=jnb06 protocol=http2
2026-07-16T07:04:39Z INF Registered tunnel connection connIndex=2 connection=3868965d-7fe7-49b9-9011-bbe777b8b187 event=0 ip=198.41.200.13 location=jnb04 protocol=http2
2026-07-16T07:04:39Z INF Registered tunnel connection connIndex=1 connection=1d0c5556-68ca-4288-8554-93f06a611bab event=0 ip=198.41.200.193 location=jnb04 protocol=http2
2026-07-16T07:04:40Z INF Registered tunnel connection connIndex=0 connection=69ad10df-7744-4c58-aca6-23311c936a13 event=0 ip=198.41.192.47 location=jnb06 protocol=http2