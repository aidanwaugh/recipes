# recipes
## Idea/ Project Brief
- Create a website to store family & commonly used recipes
- Have semantic HTML along with accessibility focus. Aim to not use `div's` only but `buttons` and `sections`
- Have the ability to search and filter recipies
- Use JavaScript to store recipe data and dynamically render some aspects (search results, changing macros)
- Desktop/ wide focused design as either a laptop or iPad will be the main items by the main user of this site (me)
- Have recipe ingredient amount and nutrition per serving be changed (serves 4 people will have different ingredient amounts than serves 6)
- UX design focus is on minimal clicks and scrolling. 
  - The search bar is just 1 click away with no full screen or drop down animation
  - The individual recipe page on desktop shows all of the information on the screen. There is no need to scroll for other information, skip past a story about the recipe origin, or be presented with a hero image of the recipe. As I and maybe family will be the users of this site, we already know what the result is. No large image is required. (An image is added in the search/index page as it is easier to recognize than read each title)

## Problems & Solutions
- **Single recipe page layout** Placing a thumbnail image, title, info/ nutrition details in a 100% width on top taking minimal space had no clear layout that I liked. I tried adding an image on the top left, but the 33% 66% grid became too apparent with no divider. Other websites I looked at all have a large image and header with the user scrolling down or splits the page in 1/2 with image an info. However this takes up too much space. Having all the information right away is the most important aspect of the design. *solution* Create a 25% x4 grid.
- **Ingredient amount conversion BUG** Scaling up and down is fine. But when I try to go up then down, the numbers don't line up properly. There is also a bug when going back down to original value. 

- **Organized single CSS file** The index and recipe page had very little in common and there was a lot of copied CSS. *Solution* Create a new css with individual blocks

## Future addons
- Better mobile design in navigation

## Takeaways for future projects / Things I learned
- Webpack and different CSS files into single
- Write CSS from simple to complex. Create the common elements and grid for all pages, and make sure is responsive before adding in smaller UI details. Saves the hassle of going back and working from the base again or starting a new file (which I did)
- Style mobile first (try and see difference) and expand out (rather than desktop down)
- Find a better way to mange media queries