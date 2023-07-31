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

{% raw %}
{% endraw %}
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
{% endraw %}
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
