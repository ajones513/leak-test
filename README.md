# leak-test

This repo highlights a possible memory leak in V8 when running JSON.parse() on large objects with special characters present, reported in https://bugs.chromium.org/p/v8/issues/detail?id=4529.

* Version: Node.js 4.2.1, v8 4.5.103.35. Happens on Node.js 0.12.2 too, if that helps.
* OS: OS X 10.9.5, pretty sure happens on CentOS 7 too (can confirm if needed)
* Architecture: x64

What steps will reproduce the problem?
-----
1) Clone https://github.com/ajones513/leak-test
2) node --expose-gc --trace-gc --trace-gc-verbose index.js
3) After 200 rounds the large object space is ~110 MB and continues to climb
4) Uncomment line 5
5) Run again using the same command
6) The large object space remains stable at ~3 MB

What is the expected output?
-----
Large object space should remain stable even with the special character present. The character present is Unicode 'RIGHT SINGLE QUOTATION MARK' (U+2019). I've used other data samples and 'HORIZONTAL ELLIPSIS' (U+2026) causes it too - I guess there's a whole group of special characters that cause the issue.

I've anonymised my data.json, hence all the '1's instead of actual data.

What do you see instead?
-----
Large object space leaks
