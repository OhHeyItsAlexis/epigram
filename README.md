# Epigram
A Java-based epigram application by Alexis Pratchett. Just a fun little coding exercise.
## Roadmap
### Backend
- [X] Find appropriate web framework
  - Most of my familiarity is with ASP.Net MVC, with very little standalone Java experience outside of private frameworks used in certain large companies. I opted for Spring Boot as Spring still appears to be popular and the closest equivalent to ASP.Net, while Spring Boot should cut out some of the boilerplate. 
- [X] Set up web framework 
- [X] Set up environmental variables (DB access)
- [X] Set up Docker container to run project in personal environment
  - Pretty happy with this set up. The compose spins up a DB wired up to sample app, with local persistence. Makes it pretty easy to get started with development, at least if you're using IntelliJ.
### Database
- [X] Create database schema
  - Since I opted for JPA it's mostly handling DB schema on its own. If this weren't a simple app I would not want to rely on it, as it could get super cumbersome once you get out of the box.
- [ ] Accounts (with roles)
- [X] Epigrams
- [ ] Epigram status (approved, unapproved)
  - Set up with [rel approval or deletion links] (https://spring.io/guides/tutorials/rest)
### API
- [X] GetRandomEpigram
  - The exact kind of scenario where JPA starts getting annoying, but it works
- [X] ListEpigrams
- [X] SubmitEpigram
- [ ] ApproveEpigram
- [X] DeleteEpigram
- [ ] CreateUser
- [ ] ApproveUser
### UI
- [ ] Set up Angular
- [ ] Sign component
- [ ] Letter component
- [ ] Pull random epigram every X minutes
- [ ] Pause/play for random functionality
- [ ] Shake device to generate new epigram (on mobile)
- [ ] Semi-mystical layout
- [ ] Epigram display page
- [ ] Login page
- [ ] Create user page
- [ ] Approve user page (admin)
- [ ] List epigram page
- [ ] Approve epigram page (admin)
### Unit tests
- [ ] Add [unit tests](https://spring.io/guides/gs/spring-boot#:~:text=from%20Spring%20Boot!-,Add%20Unit%20Tests,-You%20will%20want)