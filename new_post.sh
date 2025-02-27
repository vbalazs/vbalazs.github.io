#!/bin/bash

# usage: ./new_post.sh '<title>'

DIR=content/posts

# checking args
if [ $# != 1 ]; then
    echo 'Error! Usage: ./new_post.sh "<title>"'
    exit -1
fi

# creating variables
filenamedate=`date +"%Y-%m-%d"`
title=$1
escapedtitle=`echo $title | tr '[:upper:]' '[:lower:]' | sed -e 's/á/a/g;s/é/e/g;s/í/i/g;s/ó/o/g;s/ö/o/g;s/ő/o/g;s/ú/u/g;s/ü/u/g;s/ű/u/g;s/ /-/g'`
filename=$filenamedate'-'$escapedtitle'.md'
filepath=$DIR/$filename

HUGO_TITLE="$1" hugo new content $filepath
