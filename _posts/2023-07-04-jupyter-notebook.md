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

To include a jupyter notebook in a post, you can use the following code:


Section 1: Setting Up the Search Functionality
The script begins by defining a function called CreateWeaponUI.searchBar(), which handles the search functionality for the weapon user interface (UI). This function connects to the Text property of the SearchBox GUI element and sets up a callback function that will be executed whenever the search text changes.
```lua
function CreateWeaponUI.searchBar()
    -- Get reference to the SearchBox GUI element
    local SearchBox = LocalPlayer.PlayerGui:WaitForChild("SearchBoxGui"):WaitForChild("SearchBox")

    -- Connect a function to execute whenever the SearchBox text changes
    SearchBox:GetPropertyChangedSignal("Text"):Connect(function()
        -- Convert the search text to lowercase for case-insensitive comparison
        local searchText = string.lower(SearchBox.Text)
        
        -- Perform search filtering based on the search text
        -- (Explanation continues in the next section)
    end)
end


```

Section 2: Handling Empty Search
The script checks if the search text is empty or consists only of spaces using the :match() function with the pattern ^%s*$. If the search text is empty or contains only spaces, the function makes all items in the UI visible. This ensures that when the user clears the search box, all items are displayed again.

```lua
function CreateWeaponUI.searchBar()
    -- Get reference to the SearchBox GUI element
    local SearchBox = LocalPlayer.PlayerGui:WaitForChild("SearchBoxGui"):WaitForChild("SearchBox")

    -- Connect a function to execute whenever the SearchBox text changes
    SearchBox:GetPropertyChangedSignal("Text"):Connect(function()
        -- Convert the search text to lowercase for case-insensitive comparison
        local searchText = string.lower(SearchBox.Text)
        
        -- Perform search filtering based on the search text
        -- (Explanation continues in the next section)
    end)
end


```

Section 3: Implementing Fuzzy Matching
For non-empty search text, the script proceeds with fuzzy search filtering based on the Levenshtein distance algorithm. It uses a threshold value (currently set to 3) to determine the maximum allowed edit distance for fuzzy matching.

The script iterates through different rarity frames and their children to check for fuzzy matches with the search text. It first checks the frame names and then, if needed, proceeds to check the keywords associated with each item.

```lua
-- Continue with fuzzy search filtering for non-empty search text

local anyVisible = false -- Flag to check if at least one item is visible
local threshold = 3 -- Set a threshold for fuzzy matching

-- Iterate through the rarity frames and their children
for rarity, frame in pairs(rarityFrames) do
    for _, item in pairs(frame:GetChildren()) do
        -- Check if the child is a frame
        if item:IsA("Frame") then 
            local madeVisible = false

            -- Perform fuzzy match with the name of the frame
            local frameName = string.lower(item.Name)
            local nameDistance = levenshteinDistance(frameName, searchText)
            if nameDistance <= threshold then
                madeVisible = true
            else
                -- If the frame name doesn't match, check the keywords with fuzzy matching
                for _, keyword in pairs(item.KeyWordsFolder:GetChildren()) do
                    local keywordValue = string.lower(keyword.Value)
                    local keywordDistance = levenshteinDistance(keywordValue, searchText)
                    if keywordDistance <= threshold then
                        madeVisible = true
                        break -- No need to continue checking other keywords for this item if we found a match
                    end
                end
            end

            -- Set the item's visibility based on fuzzy match results
            if madeVisible then
                item.Visible = true
                anyVisible = true -- Set the flag to true if at least one item is visible
            else
                item.Visible = false
            end
        end
    end
end

-- End of the search functionality
```
Section 4: Conclusion
In conclusion, by incorporating fuzzy matching using the Levenshtein distance algorithm, the script significantly improves the user experience of the weapon UI. The search functionality becomes more user-friendly and forgiving, allowing players to find items even with small spelling mistakes or variations in their search queries. This approach can be adapted and utilized to enhance search functionalities in various Lua-based UI projects.
Section 4: Conclusion
In conclusion, by incorporating fuzzy matching using the Levenshtein distance algorithm, the script significantly improves the user experience of the weapon UI. The search functionality becomes more user-friendly and forgiving, allowing players to find items even with small spelling mistakes or variations in their search queries. This approach can be adapted and utilized to enhance search functionalities in various Lua-based UI projects.
```lua
-- Function to calculate the Levenshtein distance between two strings
local function levenshteinDistance(str1, str2)
    local len1, len2 = #str1, #str2
    local dp = {}

    for i = 0, len1 do
        dp[i] = {}
        for j = 0, len2 do
            if i == 0 then
                dp[i][j] = j
            elseif j == 0 then
                dp[i][j] = i
            else
                -- Calculate the cost of substitution (0 if characters are the same, 1 if different)
                local cost = str1:sub(i, i) ~= str2:sub(j, j) and 1 or 0
                dp[i][j] = math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
            end
        end
    end

    return dp[len1][len2]
end

-- Function to handle the search functionality for weapon UI
function CreateWeaponUI.searchBar()
    local searchBoxGui = LocalPlayer.PlayerGui:WaitForChild("SearchBoxGui")
    local searchBox = searchBoxGui:WaitForChild("SearchBox")

    -- Connect a function to execute whenever the Text property of the SearchBox changes
    searchBox:GetPropertyChangedSignal("Text"):Connect(function()
        local searchText = string.lower(searchBox.Text) -- Convert the search text to lowercase for case-insensitive comparison

        -- Check if the search text is empty or consists only of spaces
        if searchText:match("^%s*$") then
            -- Make all items visible since there is no search text
            for rarity, rarityFrame in pairs(rarityFrames) do
                for _, itemFrame in pairs(rarityFrame:GetChildren()) do
                    if itemFrame:IsA("Frame") then
                        itemFrame.Visible = true
                    end
                end
            end
            return -- Exit the function early, no need to continue
        end

        local anyItemVisible = false -- Flag to check if at least one item is visible
        local fuzzyMatchingThreshold = 3 -- Set a threshold for fuzzy matching

        for rarity, rarityFrame in pairs(rarityFrames) do
            for _, itemFrame in pairs(rarityFrame:GetChildren()) do
                if itemFrame:IsA("Frame") then -- Check if the child is a frame
                    local itemVisible = false

                    -- Check fuzzy match with the name of the itemFrame
                    local itemName = string.lower(itemFrame.Name)
                    local nameDistance = levenshteinDistance(itemName, searchText)
                    if nameDistance <= fuzzyMatchingThreshold then
                        itemVisible = true
                    else
                        -- If the itemFrame name doesn't match, check the keywords with fuzzy matching
                        for _, keywordValue in pairs(itemFrame.KeyWordsFolder:GetChildren()) do
                            local keyword = string.lower(keywordValue.Value)
                            local keywordDistance = levenshteinDistance(keyword, searchText)
                            if keywordDistance <= fuzzyMatchingThreshold then
                                itemVisible = true
                                break -- No need to continue checking other keywords for this itemFrame if we found a match
                            end
                        end
                    end

                    if itemVisible then
                        itemFrame.Visible = true
                        anyItemVisible = true -- Set the flag to true if at least one item is visible
                    else
                        itemFrame.Visible = false
                    end
                end
            end
        end

        -- Rest of the code...
    end)
end
```
