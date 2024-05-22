---
layout: post
title: My Journey in Creating an AutoTyper: Exploring pyautogui and Tkinter for GUI Development
date: May 22, 2024
description: A simple program that allows you to input text and a WPM count and types it for you in a document
tags: formatting lua algorithms
categories: algorithms
giscus_comments: true
related_posts: false
---

Have you ever wondered how you can automate the process of typing? How you can create a tool that types text at a set speed, makes deliberate mistakes, and pauses randomly to mimic human typing? This blog post details my experience in creating an AutoTyper using Python, a task that introduced me to the pyautogui library and enhanced my knowledge of GUI development with Tkinter. This journey was both challenging and rewarding, and I’m excited to share my insights and the code snippets that helped me along the way.

Getting Started: Understanding pyautogui and Tkinter
##pyautogui: Automating Keyboard Actions

The first tool I used was pyautogui, a Python library that allows you to control the keyboard and mouse. This library is particularly useful for creating automation scripts that can type text, move the mouse, or take screenshots. Since I was new to pyautogui, I started by exploring its basic functions.

```python
import pyautogui

# Example: Typing "Hello, World!" with pyautogui
pyautogui.write('Hello, World!', interval=0.1)

```
This simple script types "Hello, World!" with a 0.1-second interval between each character. It demonstrated how straightforward and powerful pyautogui can be for automating keyboard inputs.

##Tkinter: Building the GUI

Next, I delved into Tkinter, Python’s standard GUI (Graphical User Interface) library. Tkinter allows you to create windows, buttons, text boxes, and other GUI components. Here’s a basic example of creating a window with Tkinter:

```python
from tkinter import Tk, Label

# Create the main window
root = Tk()
root.title("My First GUI")

# Create a label widget
label = Label(root, text="Hello, Tkinter!")
label.pack()

# Run the application
root.mainloop()

```
This script creates a window with a label that says "Hello, Tkinter!". It served as the foundation for building a more complex GUI for my AutoTyper.

Building the AutoTyper

Creating the GUI

I started by designing the GUI, which included text boxes for inputting the text to type, the words-per-minute (WPM), the number of mistakes to make, and the frequency of those mistakes. Here’s a snippet of the code used to create the GUI:

```python
from tkinter import *

def create_gui():
    root = Tk()
    root.title("Auto Typer")
    root.configure(bg="#000000")

    # Frame for Text Input
    text_frame = Frame(root, bg="#333333", bd=2, relief="groove", padx=10, pady=10)
    text_frame.pack(pady=10, padx=10, fill='x')

    textLabel = Label(text_frame, text="Enter text to type:", font=("Arial", 12, "bold"), bg="#333333", fg="#ffffff")
    textLabel.grid(row=0, column=0, sticky='w')

    textBox = Text(text_frame, width=50, height=10, bg="#666666", fg="#ffffff")
    textBox.grid(row=1, column=0, pady=5)

    return root, textBox

root, textBox = create_gui()
root.mainloop()


```
Implementing the AutoTyper Logic

With the GUI in place, I moved on to the core functionality. The AutoTyper needed to type the text at a specific interval, pause randomly, and make deliberate mistakes. Here’s how I approached it:

Typing the Text
The autoTyper function handles typing the text. It writes each character with a specified interval, pauses at random intervals, and resumes typing.

```python
def autoTyper(textToType, intervals):
    import time
    global isPaused
    time.sleep(3)
    counter = 0
    for char in textToType:
        pyautogui.write(char, interval=intervals)
        counter += 1
        if counter % randomInt == 0:
            with lock:
                isPaused = True
                time.sleep(pauseDuration)
                isPaused = False
                counter = 0



```
This function types each character in textToType with a delay specified by intervals. It also pauses every randomInt characters for pauseDuration seconds, simulating a human-like pause.

Making Mistakes
To introduce mistakes, I created the chooseLetter function. It randomly selects letters to type incorrectly, based on the number of mistakes specified.

```python
import string
import random

def chooseLetter(mistakes, frequencies, lock):
    global isPaused
    i = 0
    while i <= mistakes:
        with lock:
            if isPaused:
                time.sleep(pauseDuration)
            listOfLetter = list(string.ascii_lowercase)
            randomLetter = random.choice(listOfLetter)
            pyautogui.write(randomLetter)
            i += 1
            time.sleep(.9)
            if i == mistakes:
                mistakeEveryXSecond(mistakes, frequencies, lock)



```
Bringing It All Together
Finally, I integrated everything into a single script that creates the GUI and starts the AutoTyper when the "Start Typing" button is pressed.

```python
def convert():
    textToType = str(textBox.get("1.0",'end-1c'))
    wpm = float(wpm_entry.get())
    mistakes = int(mistakesEntry.get())
    frequencies = int(frequenciesEntry.get())

    intervals = float(14.20 * (wpm ** -1.15))
    threading.Thread(target=autoTyper, args=(textToType, intervals)).start()
    time.sleep(frequencies)
    threading.Thread(target=chooseLetter, args= (mistakes, frequencies, lock)).start()

startButton = Button(root, text="Start Typing", command=convert)
startButton.pack()




```
This function retrieves the user inputs, calculates the typing intervals, and starts the typing and mistake-making threads.

Conclusion
Creating the AutoTyper was a fantastic learning experience. It taught me how to use pyautogui for automation and enhanced my skills in GUI development with Tkinter. The project required careful handling of threading and synchronization to ensure smooth operation. Here’s the complete code for reference and further experimentation:
###I hope this blog inspires you to explore pyautogui and Tkinter for your own automation and GUI projects. Happy coding!

```
