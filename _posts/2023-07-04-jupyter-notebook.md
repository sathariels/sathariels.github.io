---
layout: post
title: Levenshtein distance algorithm
date: July 25, 2023
description: "Enhancing User Experience in Space Nights Store: Leveraging the Elvenshtein Distance Algorithm for Precise Spell Check Solutions"
tags: formatting lua algorithms
categories: algorithms
giscus_comments: true
related_posts: false
---


Learning and Understanding the Levenshtein Distance


Have you ever wondered how similar two words are? How many changes do you need to make to turn one word into another? For example how many letters do you need to swap to turn “Sword” into “Sowrd”? This a questions that the Levenshtein Distance can answer.

   The Levenshtein Distance is a way of comparing how similar two words are. It counts how many changes you need to make to one word to get the other word. For example, to change “Male” to “Mace”, you only need to change one letter, so the Levenshtein Distance is 1. To change “Sword” to “Sowrd”, you need to change two letters, so the Levenshtein Distance is 2. This idea was invented by a Russian scientist named Vladimir Levenshtein. 
   
   One of the most challenging and rewarding projects that I worked on during my internship was developing a search function for my store. The store was part of a game that was aimed at 9-15 year olds, so I had to make sure that the search function was robust and user-friendly. This meant that I had to handle cases where the users would misspell or omit letters in the words they were looking for.  At first, I tried to simply match the input string with the weapon names in the store, but this approach was too rigid and failed to account for the variations in spelling. I realized that I needed a more sophisticated way to measure the similarity between two strings, and that’s when I discovered the Fuzzy Search and the Levenshtein Distance algorithm. The lower the Levenshtein Distance, the more similar the two strings are. I decided to use this algorithm as the basis for my search function, and I learned how to implement it in my code. This was a great opportunity for me to apply my computer science knowledge to a real-world problem and to improve my coding skills. Below I will detail my attempt at implementing the Levenshtein distance algorithm into my code:

```lua
local function levenshteinDistance(str1, str2)
    local len1, len2 = #str1, #str2
    local dp = {}
```

First i define a function levenshteinDistance that takes in 2 paramaenter str1, and str2 which are both strings. It the assigns the variables len1 and len2 to the number of characters the string has. The # modifier calculates how many characters are within the strings that go through the function. For example, if the string sword was passed thorugh the funciton it would calculate that the length of that string is 5 The function then defines a table call dp which is a common variable name used in the establishment of the levenshtein algorithm. 
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
The code creates a table with rows and columns that represent parts of the sequences. Each cell in the table shows how many operations are needed for those parts. The code fills in the table by starting from the top left corner and moving right and down. It uses simple rules to calculate the values in the table based on the letters at the current positions and the values in the previous cells. The final answer is in the bottom right corner of the table.
```lua
local cost = str1:sub(i, i) ~= str2:sub(j, j) and 1 or 0
                dp[i][j] = math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
            end
        end
    end

    return dp[len1][len2]
end
```
  To conclude, I would like to say that this project was a great opportunity for me to learn more about Levenshtein Distance Algorithm and its practical applications. It gave me insight into how algorithms work and how they can solve complex problems. I had to dig deeper into the fundamentals of the algorithm tp deal with edge cases and learned how to implement it correctly.I hope you enjoyed reading about my journey and learned something new along the way.



```
