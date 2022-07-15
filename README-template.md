# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). 

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode

### Screenshot

![](./screenshot.jpg)
 
### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)


### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
-javascript 
-local storage


### What I learned
- learnt how to use local storage to keep track of users data.
-  learnt how to use media queries in javascipt (matchMedia)
-  learnt how to create css variables and how to they can be useful to easily change the style of your site


```css
:root {
  --dark-blue: hsl(235, 21%, 11%);
  --desaturated-blue: hsl(235, 24%, 19%);
  }
```
```js
const mmobj = window.matchMedia("(max-width:800px)");
function view() {
  //   if viewport less than 800px, set mobile view
  if (mmobj.matches) {
    mobile();

    // if viewport is greater than 800px, set desktop view
  } else {
    desktop();
  }
}
//add an event listener to the object created such that anytime it changes(the viewport switches at the 800px breakpoint) the funtion view is called so that the view is changed
mmobj.addEventListener("change", view);
```


### Continued development
I paused the javascript course i was taking a month ago so as to build projects, i have built 4 projects so far and i think thats enough practice and its high time i completed the course. So, here i come jonas schmedtmann.
