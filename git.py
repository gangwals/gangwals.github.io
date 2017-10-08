#!/usr/bin/python

from subprocess import call


call(["git", "add", "-A"])
call(["git", "commit", "-m", "\"update\""])
call(["git", "push"])
