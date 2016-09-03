# Github-exploRepo
Built in Angular1 and Node. Front-end app consuming Github API.

## Plan:
Build a repo tracker by keywords/author. Would have been useful in my role as a coding bootcamp teaching assistant, to track students and all their repos OR keep track of homework by a given repo name.

## Assumption:
Return repo watchers instead of 'followers' as given in the task. Users have followers whereas repos have watchers/subscribers.

## Commit History + Behind the scenes thought process
0. Setup Github
0. Basic skeleton + styling
  - I like to make my apps look somewhat decent at the start since I'm going to look at it for the next X hours anyway. Sketched out wireframes and based it off there.
0. Instant search working
    - on input change, send an ajax call to github search API
    - output result repo names in the view.
0. 2nd ajax call to get repo details (except languages, have to make a 3rd call)
0. Removed instant search
    -because each letter typed would send an ajax call which is not optimal (also Github doesn't allow that many calls)
    - added form so that I can search on enter keypress
0. Refactored Ajax
    - realized I could get all the repo details (except language) in the 1st call so refactored to 2 ajax calls.
0. Language graph, click to expand details
    - Error Handling: If no search term entered, no repos found etc
    - Graph to show languages. Tried a few chart libraries but most display the data only on hover (not mobile-friendly). Settled on n3-piechart.
    - got ng-click ng-show actions to work but they applied to all ng-repeat elements (eg on click, all details expand and all have the same language chart)
0. MVP!!
    - resolved: ng-cick & ng-show apply only on the element clicked by passing $index in the function and `$scope.results[index].something`
    - error handling for language
    - Added search by author functionality + error handling
0. Added this readme + prevent resizing on mobile

## Bugs to fix (feedback from testers aka friends)
[ ] previous results show if new search term doesn't yield results    
[ ] limit languages to 4, else text will overrun the doughnut chart    
[ ] github links should open in new tab    
[X] prevent users from scaling in mobile     
[ ] down arrow animation when results appear. Else it's not intuitive to scroll down.    
[ ] (Bonus feature) specific colors to specific languages, rather than same colors regardless of language. Because people recognize color better than the text)   

## Things I want improve at:
- Testing. I've tried Capybera for Ruby but I'm not familiar with testing for Node front end. So I decided to shelve it to my 'things to learn' list after I complete this assignment. Will explore Selenium/Zombie/PhantomJS/CasperJS
- CSS libraries for Angular - Usually I use materialize/bootstrap but I realized that angular materialize is slightly different from materialize. Didnt have time figure out the differences so I decided to do my own CSS :P Quite enjoyed it after using libraries for my past projects!
