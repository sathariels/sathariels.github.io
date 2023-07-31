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

Of course! Let's replace the code comments with explanatory text under each section:

Section 1: Setting Up the Search Functionality
The script begins by defining a function called CreateWeaponUI.searchBar(), which handles the search functionality for the weapon user interface (UI). This function connects to the Text property of the SearchBox GUI element and sets up a callback function that will be executed whenever the search text changes.

lua
Copy code
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
Section 2: Handling Empty Search
The script checks if the search text is empty or consists only of spaces using the :match() function with the pattern ^%s*$. If the search text is empty or contains only spaces, the function makes all items in the UI visible. This ensures that when the user clears the search box, all items are displayed again.

lua
Copy code
-- Continue with fuzzy search filtering for non-empty search text

-- Check if the search text is empty or consists only of spaces
if searchText:match("^%s*$") then
    -- Make all items visible since there is no search text
    for rarity, frame in pairs(rarityFrames) do
        for _, item in pairs(frame:GetChildren()) do
            if item:IsA("Frame") then
                item.Visible = true
            end
        end
    end
    return -- Exit the function early, no need to continue
end

-- Continue with fuzzy search filtering for non-empty search text
Section 3: Implementing Fuzzy Matching
For non-empty search text, the script proceeds with fuzzy search filtering based on the Levenshtein distance algorithm. It uses a threshold value (currently set to 3) to determine the maximum allowed edit distance for fuzzy matching.

The script iterates through different rarity frames and their children to check for fuzzy matches with the search text. It first checks the frame names and then, if needed, proceeds to check the keywords associated with each item.

lua
Copy code
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
Section 4: Conclusion
In conclusion, by incorporating fuzzy matching using the Levenshtein distance algorithm, the script significantly improves the user experience of the weapon UI. The search functionality becomes more user-friendly and forgiving, allowing players to find items even with small spelling mistakes or variations in their search queries. This approach can be adapted and utilized to enhance search functionalities in various Lua-based UI projects.
