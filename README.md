# Epigram
A Java-based epigram application by Alexis Pratchett. Just a fun little coding exercise.
## Roadmap
### Backend
- [X] Find appropriate web framework
  - Most of my familiarity is with ASP.Net MVC, with very little standalone Java experience outside of private frameworks used in certain large companies. I opted for Spring Boot as Spring still appears to be popular and the closest equivalent to ASP.Net, while Spring Boot should cut out some of the boilerplate. 
- [X] Set up web framework 
  - This took longer than expected. There were lots of conflicts between newer Java version and different forms of tooling. For example I started on Gradle with v24, which immediately introduced the issue of Gradle just not being compatible at all. I switched over to Maven, which mostly was, but ended up  downgrading to v17 while trying to uncover some dependency issues.
- [ ] Set up environmental variables (DB access)
  - Not particularly high priority as this is just a demo and uses its own Postgres instance that should be taken down when the demo is done.
- [X] Set up Docker container to run project in personal environment
  - Pretty happy with this set up. The compose spins up a DB wired up to sample app, with local persistence. Makes it pretty easy to get started with development, at least if you're using IntelliJ.
### Database
- [X] Create database schema
  - Since I opted for JPA it's mostly handling DB schema on its own. If this weren't a simple app I would not want to rely on it, as it could get super cumbersome once you get out of the box.
- [ ] Accounts (with roles)
- [X] Epigrams
  - Including seeding of database when empty.
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
- [ ] Fix up requiring CORS annotations in every endpoint
### UI
- [X] Set up Angular
  - Also set up with Docker. This is a bit slower that I'd like, as there doesn't seem to be a container with Angular already installed, but it does have live reloading so you do only need to run it once and can then work on the fly. 
- [ ] Epigram service
- [ ] Set service up to consume HATEOAS
- [ ] Remove hard-coded URLs
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