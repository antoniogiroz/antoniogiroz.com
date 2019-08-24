<template>
  <Layout>
    <div class="card">
      <g-image class="card__avatar" src="@/images/avatar.jpg" />

      <div class="contact-info">
        <div>
          <h1 class="card__name">Antonio Gil</h1>
          <h2 class="card__job-title">Senior developer</h2>
          <p class="card__location">Málaga (Spain)</p>
        </div>

        <div>
          <h3>
            <span>Follow</span>
          </h3>
          <div class="card__social-info">
            <a href="https://twitter.com/antonioluisgil" class="social-link" target="_blank">
              <svg class="icon-twitter" />
            </a>
            <a href="https://github.com/algil" class="social-link" target="_blank">
              <svg class="icon-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/antonioluisgil/"
              class="social-link"
              target="_blank"
            >
              <svg class="icon-linkedin" />
            </a>
          </div>
        </div>

        <div>
          <h3>
            <span>Contact</span>
          </h3>
          <p class="card__email">
            <a href="mailto:antonio.luis.gil@gmail.com">antonio.luis.gil@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {};
</script>