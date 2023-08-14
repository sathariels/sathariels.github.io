---
layout: post
title: Levenshtein distance algorithm
date: July 25, 2023
description: "Enhancing User Experience in Space Nights Store: Leveraging the Elvenshtein Distance Algorithm for Precise Spell Check Solutions"
tags: formatting lua algorithms
categories: sample-posts
giscus_comments: true
related_posts: false
---


 Exploring the Levenshtein Distance: A Journey of Learning and Understanding

The Levenshtein Distance is a simple yet powerful algorithm that measures the similarity between two strings. It can be used to solve many problems in computer science and natural language processing, such as spell-checking, DNA sequence alignment, and more. I was amazed by its versatility and elegance when I learned about it. 
   The Levenshtein Distance is a way of comparing how similar two words are. It counts how many changes you need to make to one word to get the other word. For example, to change “cat” to “bat”, you only need to change one letter, so the Levenshtein Distance is 1. To change “cat” to “dog”, you need to change three letters, so the Levenshtein Distance is 3. This idea was invented by a Russian scientist named Vladimir Levenshtein. 
   During my internship, I was tasked with creating a search function for my store. This was not an easy feat, as there were many edge cases that I needed to take into consideration. For example, since this game was mostly going to be played by 9-15 year olds, I needed to account for misspellings and missing letters in words. In the beginning, I would only match the string to the weapon name, but this would not solve the edge cases that I had to deal with. This prompted me to research other ways to implement the search function in my store. That’s when I stumbled across the Fuzzy Search and in particular the Levenshtein Distance. I decided to learn more about it and try to implement it in my code. This resulted in a greater understanding of the algorithm behind the Levenshtein Distance, as well as my introduction to the real-life applications of computer science. Below i will detail my attempt at implementing the levenshtein algorithm into my code:

```lua
local function levenshteinDistance(str1, str2)
    local len1, len2 = #str1, #str2
    local dp = {}
```

First i define a function levenshteinDistance that takes in 2 paramaenter str1, and str2 which are both strings. It the assigns the variables len1 and len2 to the number of characters the string has. The # modifier calculates how many characters are within the strings that go through the function. The function then defines a table call dp which is a common variable name used in the establishment of the levenshtein algorithm. 
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
The code makes a table with rows and columns that show parts of the words. Each box in the table tells you how many steps you need for those parts. The code fills in the table by starting from the top left corner and moving right and down. It uses simple rules to figure out the numbers in the table based on the letters at the current spots and the numbers in the nearby boxes. The final answer is in the bottom right corner of the table.

   Overall, This endeavor was a valuable learning experience for me. I learned a lot about computer science and its real-life applications. I also learned that trying to satisfy all the edge cases for a given problem is not always possible and there is a limit to what I can do. I also learned a lot about the computer science fundamentals, as this is a very famous algorithm and in the process of trying to understand it, I learned a lot about how algorithms are used in the real world and how they are applicable to my job as well as side projects I have participated in. Lastly, I learned that it takes time to fully understand a certain fundamental principle. In the beginning, I used chatgpt to almost take a shortcut to achieving my goals. But then I began to realize that I was not learning much of anything and this became a problem when my code started to break and I did not know how to fix it. As such, I learned that AI cannot do my thinking for me and learning about this complex algorithm led me to that conclusion




```
