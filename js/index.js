document.addEventListener('DOMContentLoaded', () => {
  const stack = document.querySelector('.card-stack');
  const heartContainer = document.querySelector('.heart-container');

  function showHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = `${x - 24}px`;
    heart.style.top = `${y - 24}px`;
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  function setupTopCard() {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;

    const card = cards[cards.length - 1];

    // Remove previous listeners if any (to avoid duplicates)
    card.onpointerdown = null;
    card.onpointermove = null;
    card.onpointerup = null;
    card.onpointercancel = null;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onPointerDown = (e) => {
      startX = e.clientX;
      isDragging = true;
      card.setPointerCapture(e.pointerId);
      card.style.transition = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      const rotation = currentX / 10;
      card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      const threshold = 100;
      const direction = currentX > 0 ? 1 : -1;

      if (Math.abs(currentX) > threshold) {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = `translateX(${direction * 1000}px) rotate(${direction * 30}deg)`;

        showHeart(e.clientX, e.clientY);

        setTimeout(() => {
          card.style.transition = 'none';
          card.style.transform = 'none';
          stack.insertBefore(card, stack.firstChild);
          setupTopCard();
        }, 500);
      } else {
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'translateX(0px) rotate(0deg)';
      }

      currentX = 0;
    };

    // Attach handlers with onpointer* to allow easy cleanup next time
    card.onpointerdown = onPointerDown;
    card.onpointermove = onPointerMove;
    card.onpointerup = onPointerUp;
    card.onpointercancel = onPointerUp;
  }

  setupTopCard();
});
