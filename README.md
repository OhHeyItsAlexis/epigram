# Epigram
A Java-based epigram application by Alexis Pratchett. Just a fun little coding exercise.
## Roadmap
### Backend
- [X] Find appropriate web framework
  - Most of my familiarity is with ASP.Net MVC, with very little standalone Java experience outside of private frameworks used in certain large companies. I opted for Spring Boot as Spring still appears to be popular and the closest equivalent to ASP.Net, while Spring Boot should cut out some of the boilerplate. 
- [X] Set up web framework 
- [ ] Set up environmental variables (DB access)
- [ ] Set up Docker container to run project in personal environment
### Database
- [ ] Create database schema
- [ ] Accounts (with roles)
- [ ] Epigrams
### API
- [ ] GetRandomEpigram
- [ ] ListEpigrams
- [ ] SubmitEpigram
- [ ] ApproveEpigram
- [ ] DeleteEpigram
- [ ] CreateUser
- [ ] ApproveUser
### UI
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