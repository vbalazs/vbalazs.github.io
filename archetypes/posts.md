{{- $date := dateFormat "2006-01-02-" .Date -}}
{{- $slug := replace .File.ContentBaseName $date "" -}}
+++
date = '{{ .Date }}'
draft = true
title = '{{ getenv "HUGO_TITLE" }}'
slug = '{{ $slug }}'
tags = []
keywords = ['']
languages = ['en']
+++
