#!/usr/bin/env python3

import sys

current_word = None
current_count = 0
word = None

for line in sys.stdin:
    line = line.strip()

    word = line.split("\t")[0]  # 단어
    count = int(line.split("\t")[1])    # 1

    if current_word == word:
        current_count += count

    else:
        if current_word:    # None이 아닐 때
            print ("{}\t{}".format(current_word, current_count))
            
        current_count = count
        current_word = word

print ("{}\t{}".format(current_word, current_count))