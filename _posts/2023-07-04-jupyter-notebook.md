---
layout: post
title: How do you code a Search feature using Levenshtein Algorithm
date: July 25, 2023
description: Precise Spell Check Solution
tags: formatting lua algorithms
categories: algorithms
giscus_comments: true
related_posts: false
---


My Journey to Levenshtein Algorithm 


Have you ever wondered how similar two words are? How many changes do you need to make to turn one word into another? For example, how many letters do you need to swap to turn “Sowrd” into “Sword”? That’s the question that the Levenshtein Distance can answer.

The Levenshtein Distance is a way of comparing how similar two words are. It counts how many changes you need to make to one word to get the other word. For example, to change “Male” to “Mace”, you only need to change one letter, so the Levenshtein Distance is 1. To change “Sowrd” to “Sword”, you need to change two letters, so the Levenshtein Distance is 2. This algorithm was invented by a Russian scientist named Vladimir Levenshtein.
The Weapons store we were building is part of a game that is aimed for 9–15-year-olds, so I had to make sure that the search function was robust and user-friendly. This meant that I had to handle cases where the users would misspell or omit letters in the words they were looking for. At first, I tried to simply match the input string with the weapon names in the store, but this approach was too rigid and failed to account for the variations in spelling. I realized that I needed a more sophisticated way to measure the similarity between two strings, and that’s when I discovered the Fuzzy Search and the Levenshtein Distance algorithm. 

Fuzzy search is a technique used in information retrieval and text searching to find results that are approximately, rather than exactly, matching a search query. It is particularly useful when dealing with data that may contain errors, misspellings, or variations in spelling and formatting. One of the fundamental algorithms used for fuzzy search is Levenshtein distance algorithm. The benefits of using Levenshtein distance algorithm is search result precision, customization of search and simplicity. When you compare two strings, the lower the Levenshtein Distance, the more similar the two strings are. I decided to use this algorithm as the basis for my search function, and I learned how to implement it in my code. This was a great opportunity for me to apply my computer science knowledge to a real-world problem and to improve my coding skills. 
Below I will detail my attempt at implementing the Levenshtein distance algorithm into my code:

```lua
local function levenshteinDistance(str1, str2)
    local len1, len2 = #str1, #str2
    local dp = {}
```

First, define a function levenshteinDistance that takes in two parameters str1, and str2 which are both strings. It then assigns the variables len1 and len2 to the number of characters each string has. The # modifier calculates how many characters are within the strings that go through the function. 
For example, if the string sword was passed through the function, it would calculate that the length of that string is 5 The function then defines a table call dp which is a common variable name used in the establishment of the Levenshtein algorithm.

```lua
for i = 0, len1 do
        dp[i] = {}
        for j = 0, len2 do
            if i == 0 then
                dp[i][j] = j
            elseif j == 0 then
                dp[i][j] = i
            else
```
This code creates a table with rows and columns that represent parts of the sequences. Each cell in the table shows how many operations are needed for those parts. The code fills in the table by starting from the top left corner and moving right and down. It uses simple rules to calculate the values in the table based on the letters at the current positions and the values in the previous cells. The value at dp[i][j] represents the Levenshtein distance between the first i characters of s1 and the first j characters of s2.

```lua
local cost = str1:sub(i, i) ~= str2:sub(j, j) and 1 or 0
                dp[i][j] = math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
            end
        end
    end

    return dp[len1][len2]
end

```
We iterate through the matrix to fill it in, using the recurrence relation for the Levenshtein distance: dp[i][j] is the minimum of three possible operations

Finally, the bottom-right cell of the matrix (dp[len_s1][len_s2]) contains the Levenshtein distance between the entire strings s1 and s2.
I hope you enjoyed reading about Levenshtein distance algorithm and learned something new along the way.




```
