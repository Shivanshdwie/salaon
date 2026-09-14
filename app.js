/**
 * GLOW STUDIO — HAZRATGANJ, LUCKNOW
 * Client-side interactivity, WhatsApp triggers, and Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '919839012345'; // Glow Studio Hazratganj Contact

  /* ==========================================================================
     1. Header Scroll State
     ========================================================================== */
  const header = document.getElementById('siteHeader');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ==========================================================================
     2. Mobile Drawer Navigation
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleDrawer = (open) => {
    if (!mobileDrawer || !mobileToggle) return;
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-open');
    if (shouldOpen) {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => toggleDrawer());
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) toggleDrawer(false);
    });
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });
  }

  /* ==========================================================================
     3. Active Nav Link Detection for Multi-page
     ========================================================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ==========================================================================
     4. Instagram Gallery Filter Tabs
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  /* ==========================================================================
     5. Gallery Lightbox
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxWhatsAppBtn = document.getElementById('lightboxWhatsAppBtn');

  const openLightbox = (item) => {
    if (!lightboxModal) return;
    const imgEl = item.querySelector('img');
    const catEl = item.querySelector('.gallery-cat-tag');
    const titleEl = item.querySelector('.gallery-item-title');

    if (!imgEl) return;

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || 'Glow Studio Instagram look';
    lightboxCat.textContent = catEl ? catEl.textContent : 'Glow Studio Lucknow';
    lightboxTitle.textContent = titleEl ? titleEl.textContent : 'Signature Style';

    if (lightboxWhatsAppBtn) {
      const lookTitle = titleEl ? titleEl.textContent : 'this look';
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Glow Studio, I saw ' + lookTitle + ' on your website gallery and want to book an appointment for this!')}`;
      lightboxWhatsAppBtn.href = waUrl;
    }

    lightboxModal.classList.add('is-open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  /* ==========================================================================
     6. Direct WhatsApp & Modal Triggers
     ========================================================================== */
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('serviceSelect');
  const appointmentDateInput = document.getElementById('appointmentDate');

  if (appointmentDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    appointmentDateInput.min = `${yyyy}-${mm}-${dd}`;
    appointmentDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  const openBookingModal = (preselectedService = null) => {
    if (!bookingModal) return;
    if (lightboxModal && lightboxModal.classList.contains('is-open')) closeLightbox();
    if (mobileDrawer && mobileDrawer.classList.contains('is-open')) toggleDrawer(false);

    if (preselectedService && serviceSelect) {
      const cleanService = preselectedService.trim().toLowerCase();
      for (const option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(cleanService) || cleanService.includes(option.value.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    bookingModal.classList.add('is-open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('is-open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-booking-modal-btn');
    if (trigger) {
      e.preventDefault();
      const service = trigger.getAttribute('data-service');
      openBookingModal(service);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeBookingModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeBookingModal);

  // Form submission: redirect directly to WhatsApp with pre-filled message!
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const name = formData.get('name') || 'Valued Client';
      const phone = formData.get('phone') || '';
      const service = formData.get('service') || 'Consultation';
      const date = formData.get('date') || 'Preferred Date';
      const time = formData.get('time') || 'Preferred Time';
      const notes = formData.get('notes') || '';

      const msg = `*Appointment Request — Glow Studio Hazratganj*\n` +
                  `• Name: ${name}\n` +
                  `• Phone: ${phone}\n` +
                  `• Service: ${service}\n` +
                  `• Date: ${date}\n` +
                  `• Slot: ${time}` +
                  (notes ? `\n• Note: ${notes}` : '');

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      closeBookingModal();
    });
  }

  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (bookingModal && bookingModal.classList.contains('is-open')) closeBookingModal();
      if (lightboxModal && lightboxModal.classList.contains('is-open')) closeLightbox();
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) toggleDrawer(false);
    }
  });
});
