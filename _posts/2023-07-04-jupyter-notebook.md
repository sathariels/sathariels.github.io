---
layout: post
title: Levenshtein distance algorithm
date: July 25, 2023
description: "Enhancing User Experience in Space Nights Store: Leveraging the Elvenshtein Distance Algorithm for Precise Spell Check Solutions"
tags: formatting jupyter
categories: sample-posts
giscus_comments: true
related_posts: false
---

To include a jupyter notebook in a post, you can use the following code:

{% raw %}

```lua
local function levenshteinDistance(s1, s2)
	local m, n = #s1, #s2
	local dp = {}

	for i = 0, m do
		dp[i] = {}
		for j = 0, n do
			if i == 0 then
				dp[i][j] = j
			elseif j == 0 then
				dp[i][j] = i
			else
				local cost = s1:sub(i, i) ~= s2:sub(j, j) and 1 or 0
				dp[i][j] = math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
			end
		end
	end

	return dp[m][n]
end

function CreateWeaponUI.searchBar()
	local SearchBox = LocalPlayer.PlayerGui:WaitForChild("SearchBoxGui"):WaitForChild("SearchBox")

	SearchBox:GetPropertyChangedSignal("Text"):Connect(function()
		local text = string.lower(SearchBox.Text) -- Convert the search text to lowercase for case-insensitive comparison

		-- Check if the search text is empty or consists only of spaces
		if text:match("^%s*$") then
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

		local anyVisible = false -- Flag to check if at least one item is visible
		local threshold = 3 -- Set a threshold for fuzzy matching

		for rarity, frame in pairs(rarityFrames) do
			for _, item in pairs(frame:GetChildren()) do
				if item:IsA("Frame") then -- Check if the child is a frame
					local madeVisible = false

					-- Check fuzzy match with the name of the frame
					local frameName = string.lower(item.Name)
					local nameDistance = levenshteinDistance(frameName, text)
					if nameDistance <= threshold then
						madeVisible = true
					else
						-- If the frame name doesn't match, check the keywords with fuzzy matching
						for _, keyword in pairs(item.KeyWordsFolder:GetChildren()) do
							local keywordValue = string.lower(keyword.Value)
							local keywordDistance = levenshteinDistance(keywordValue, text)
							if keywordDistance <= threshold then
								madeVisible = true
								break -- No need to continue checking other keywords for this item if we found a match
							end
						end
					end

					if madeVisible then
						item.Visible = true
						anyVisible = true -- Set the flag to true if at least one item is visible
					else
						item.Visible = false
					end
				end
			end
		end

		-- Assuming you want to show/hide the entire rarity frame based on visibility of its items.
		-- You can modify this part according to your UI structure if you want a different behavior.

	end)
end

{% endraw %}

Introduction

The creation of an immersive and seamless user experience lies at the heart of game development. In our pursuit of excellence for the Space Nights store, a critical challenge surfaced—the need for an efficient spell check mechanism to ensure effortless user interactions. This essay delves into the captivating journey of implementing the Levenshtein Distance Algorithm, a powerful tool that revolutionized the store's search functionality and elevated customer satisfaction to new heights.

The Space Nights Vision

The inception of the Space Nights store sprang from a compelling vision—to provide gamers with a vibrant marketplace brimming with a diverse array of in-game assets and utilities. However, as we embarked on the journey of bringing this vision to life, we recognized the pivotal role of a user-friendly spell check feature. Accurate guidance for users to find their desired items emerged as a crucial aspect, compelling us to explore innovative solutions.

The Spell Check Predicament

Understanding the intricacies of the spell check challenge was the initial obstacle we faced. The multifaceted nature of the problem encompassed typographical errors, varied search inputs, and the need to accommodate multilingual queries. This called for an algorithmic solution capable of offering real-time, precise suggestions—a challenge that ignited our curiosity and determination.

Introducing the Levenshtein Distance Algorithm

In our quest for an impeccable spell check mechanism, the Levenshtein Distance Algorithm emerged as a guiding light. Rooted in the concept of edit distances, this algorithm quantified the similarity between two strings, laying the foundation for accurate search suggestions. Embracing the Levenshtein Distance Algorithm promised to significantly enhance the user experience within the Space Nights store.

Bringing the Algorithm to Life

Implementing the Levenshtein Distance Algorithm demanded persistent effort and skill. Through meticulous study and hands-on coding, we explored the nuances of the algorithm, identified the most efficient data structures, and honed dynamic programming principles. This concerted endeavor culminated in a responsive system capable of effortlessly handling extensive search datasets, ensuring a seamless user experience.

Elevating the User Experience

As the Levenshtein Distance Algorithm took root in the Space Nights store, its transformative impact became evident. Users now encountered spell check suggestions that gracefully accounted for their unintentional spelling errors. This subtle yet profound improvement resonated deeply with players, fostering a sense of satisfaction and seamless navigation throughout the store.

Continuous Refinement through User Feedback

The journey of implementation did not end with success. Embracing an iterative development approach, we actively sought and carefully considered user feedback. Armed with invaluable insights, the algorithm evolved to surpass expectations, continually adapting to meet the ever-changing demands of our players.

Conclusion

The integration of the Levenshtein Distance Algorithm into the Space Nights store stands as a testament to the boundless potential of innovation. This remarkable tool empowered us to conquer the spell check predicament, transforming our ambitious vision into a captivating reality—a thriving marketplace where users could fully immerse themselves in the enchanting world of Space Nights. As the realm of gaming continues to evolve, we remain steadfast in our commitment to elevating the user experience, exploring new frontiers, and harnessing the power of technology to redefine possibilities in the gaming domain.

