'use strict';

/**
 * Interactive behavior for the SphynxVision landing page.
 * Handles navigation, modals, image/video zooming, gallery controls, and mailto forms.
 */

const betaModal = document.getElementById('betaModal');
const betaFormModal = document.getElementById('betaFormModal');
const contactForm = document.getElementById('contactForm');
const betaAccessForm = document.getElementById('betaAccessForm');
const testimonialsModal = document.getElementById('testimonialsModal');
const navbar = document.querySelector('.navbar');
const imageZoomModal = document.getElementById('imageZoomModal');
const imageZoomTarget = document.getElementById('imageZoomTarget');
const videoZoomTarget = document.getElementById('videoZoomTarget');
const imageZoomCaption = document.getElementById('imageZoomCaption');
const footerGallery = document.querySelector('.footer-gallery');
const footerGalleryImages = document.querySelectorAll('[data-gallery-thumb]');
const footerGalleryVideos = document.querySelectorAll('[data-gallery-video]');
const galleryScrollButtons = document.querySelectorAll('[data-gallery-scroll]');
const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
const navLinks = document.querySelector('.nav-links');
const openBetaModalButtons = document.querySelectorAll('[data-open-beta-modal]');
const closeBetaModalButtons = document.querySelectorAll('[data-close-beta-modal]');
const openBetaFormModalButtons = document.querySelectorAll('[data-open-beta-form-modal]');
const closeBetaFormModalButtons = document.querySelectorAll('[data-close-beta-form-modal]');
const openTestimonialsModalButtons = document.querySelectorAll('[data-open-testimonials-modal]');
const closeTestimonialsModalButtons = document.querySelectorAll('[data-close-testimonials-modal]');
const zoomImageButtons = document.querySelectorAll('[data-zoom-image]');
const closeImageZoomButtons = document.querySelectorAll('[data-close-image-zoom]');
const formEmailRecipient = 'haemmerich@oncoblaze.com';

/**
 * Hides the sticky navbar after the visitor scrolls past the hero area.
 * The navbar stays visible while the mobile menu is open.
 */
function updateNavbarVisibility() {
    if (!navbar) {
        return;
    }

    const currentScrollY = window.scrollY;
    const menuIsOpen = navLinks && navLinks.classList.contains('is-open');
    const shouldHide = currentScrollY > 120 && !menuIsOpen;
    navbar.classList.toggle('is-hidden', shouldHide);
}

window.addEventListener('scroll', updateNavbarVisibility, { passive: true });

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        navbar?.classList.remove('is-hidden');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

/** Opens the Pioneer Program overview modal. */
function openBetaModal() {
    betaModal.classList.add('is-open');
    betaModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

/** Closes the Pioneer Program overview modal. */
function closeBetaModal() {
    betaModal.classList.remove('is-open');
    betaModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

/** Switches from the overview modal to the early-access form modal. */
function openBetaFormModal() {
    closeBetaModal();
    betaFormModal.classList.add('is-open');
    betaFormModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    betaAccessForm.querySelector('input').focus();
}

/** Closes the early-access form modal. */
function closeBetaFormModal() {
    betaFormModal.classList.remove('is-open');
    betaFormModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

/** Opens the testimonials modal. */
function openTestimonialsModal() {
    testimonialsModal.classList.add('is-open');
    testimonialsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

/** Closes the testimonials modal. */
function closeTestimonialsModal() {
    testimonialsModal.classList.remove('is-open');
    testimonialsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

/**
 * Opens the image zoom modal for gallery, comparison, and application images.
 * @param {HTMLImageElement} image - Image element to show in the modal.
 */
function openImageZoom(image) {
    const caption = image.dataset.galleryTitle || '';
    videoZoomTarget.pause();
    videoZoomTarget.style.display = 'none';
    videoZoomTarget.removeAttribute('src');
    imageZoomTarget.style.display = 'block';
    imageZoomTarget.src = image.src;
    imageZoomTarget.alt = image.alt;
    imageZoomCaption.textContent = caption;
    imageZoomCaption.style.display = caption ? 'block' : 'none';
    imageZoomTarget.dataset.zoomScale = '1';
    imageZoomTarget.style.transform = 'scale(1)';
    imageZoomTarget.style.transformOrigin = 'center';
    imageZoomTarget.onload = () => {
        imageZoomModal.style.setProperty('--zoom-width', `${imageZoomTarget.naturalWidth}px`);
    };
    if (imageZoomTarget.complete) {
        imageZoomModal.style.setProperty('--zoom-width', `${imageZoomTarget.naturalWidth}px`);
    }
    imageZoomModal.classList.add('is-open');
    imageZoomModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

/**
 * Opens the zoom modal in video mode.
 * @param {HTMLElement} button - Gallery control with a data-gallery-video source.
 */
function openVideoZoom(button) {
    const caption = button.dataset.galleryTitle || 'Real-time image series (1/second) of heat-activated drug delivery (doxorubicin)';
    imageZoomTarget.style.display = 'none';
    imageZoomTarget.removeAttribute('src');
    imageZoomTarget.alt = '';
    videoZoomTarget.src = button.dataset.galleryVideo;
    videoZoomTarget.load();
    videoZoomTarget.style.display = 'block';
    imageZoomCaption.textContent = caption;
    imageZoomCaption.style.display = caption ? 'block' : 'none';
    imageZoomModal.classList.add('is-open');
    imageZoomModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

/** Resets and closes the media zoom modal. */
function closeImageZoom() {
    imageZoomModal.classList.remove('is-open');
    imageZoomModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    imageZoomTarget.removeAttribute('src');
    imageZoomTarget.alt = '';
    imageZoomTarget.dataset.zoomScale = '1';
    imageZoomTarget.style.transform = 'scale(1)';
    imageZoomTarget.style.transformOrigin = 'center';
    imageZoomTarget.style.display = 'block';
    imageZoomCaption.textContent = '';
    imageZoomCaption.style.display = 'none';
    videoZoomTarget.pause();
    videoZoomTarget.removeAttribute('src');
    videoZoomTarget.style.display = 'none';
    resetInlineImageZoom();
}

let selectedFooterImageIndex = 0;

/**
 * Marks the requested footer gallery item as selected and scrolls it into view.
 * @param {number} index - Zero-based gallery item index.
 */
function selectFooterImage(index) {
    const galleryItems = [...footerGalleryImages, ...footerGalleryVideos];
    if (!galleryItems.length) {
        return;
    }
    selectedFooterImageIndex = Math.max(0, Math.min(galleryItems.length - 1, index));
    footerGalleryImages.forEach((image, imageIndex) => {
        image.classList.toggle('is-selected', imageIndex === selectedFooterImageIndex);
    });
    footerGalleryVideos.forEach((videoButton, videoIndex) => {
        videoButton.classList.toggle('is-selected', footerGalleryImages.length + videoIndex === selectedFooterImageIndex);
    });
    if (footerGallery) {
        const selectedItem = galleryItems[selectedFooterImageIndex];
        const imageLeft = selectedItem.offsetLeft;
        const imageCenter = imageLeft - (footerGallery.clientWidth / 2) + (selectedItem.clientWidth / 2);
        footerGallery.scrollTo({
            left: imageCenter,
            behavior: 'smooth'
        });
    }
}

/**
 * Calculates a conservative inline zoom ceiling from natural and rendered image sizes.
 * @param {HTMLImageElement} image - Image being zoomed.
 * @returns {number} Maximum scale value for wheel zooming.
 */
function getInlineImageMaxScale(image) {
    const container = image.matches('[data-zoom-image]')
        ? image
        : image.closest('[data-zoom-image]');
    const bounds = container ? container.getBoundingClientRect() : image.getBoundingClientRect();
    const maxWidthScale = image.naturalWidth ? image.naturalWidth / Math.max(1, bounds.width) : 2;
    const maxHeightScale = image.naturalHeight ? image.naturalHeight / Math.max(1, bounds.height) : 2;
    return Math.max(1.8, Math.min(2.4, maxWidthScale, maxHeightScale));
}

/**
 * Restores inline zoomable images to their original scale and centered origin.
 * @param {Element} [container] - Optional zoom container to reset. Resets all when omitted.
 */
function resetInlineImageZoom(container) {
    const containers = container ? [container] : zoomImageButtons;
    containers.forEach((item) => {
        const image = item.matches('img') ? item : item.querySelector('img');
        if (!image) {
            return;
        }
        image.dataset.zoomScale = '1';
        image.style.transform = 'scale(1)';
        image.style.transformOrigin = 'center';
    });
}

openBetaModalButtons.forEach((button) => {
    button.addEventListener('click', openBetaModal);
});

closeBetaModalButtons.forEach((button) => {
    button.addEventListener('click', closeBetaModal);
});

openBetaFormModalButtons.forEach((button) => {
    button.addEventListener('click', openBetaFormModal);
});

closeBetaFormModalButtons.forEach((button) => {
    button.addEventListener('click', closeBetaFormModal);
});

openTestimonialsModalButtons.forEach((button) => {
    button.addEventListener('click', openTestimonialsModal);
});

closeTestimonialsModalButtons.forEach((button) => {
    button.addEventListener('click', closeTestimonialsModal);
});

zoomImageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const image = button.matches('img') ? button : button.querySelector('img');
        if (image) {
            const footerIndex = Array.from(footerGalleryImages).indexOf(image);
            if (footerIndex !== -1) {
                selectFooterImage(footerIndex);
            }
            openImageZoom(image);
        }
    });

    button.addEventListener('mousemove', (event) => {
        const image = button.matches('img') ? button : button.querySelector('img');
        if (!image) {
            return;
        }
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        image.style.transformOrigin = `${x}% ${y}%`;
    });

    button.addEventListener('wheel', (event) => {
        const image = button.matches('img') ? button : button.querySelector('img');
        if (!image) {
            return;
        }
        const maxScale = getInlineImageMaxScale(image);
        if (maxScale <= 1) {
            return;
        }
        event.preventDefault();
        const currentScale = Number(image.dataset.zoomScale || '1');
        const nextScale = event.deltaY < 0
            ? Math.min(maxScale, currentScale + 0.22)
            : Math.max(1, currentScale - 0.22);
        image.dataset.zoomScale = String(nextScale);
        image.style.transform = `scale(${nextScale})`;
    }, { passive: false });

    button.addEventListener('mouseleave', () => {
        resetInlineImageZoom(button);
    });
});

closeImageZoomButtons.forEach((button) => {
    button.addEventListener('click', closeImageZoom);
});

if (footerGallery) {
    let isFooterGalleryDragging = false;
    let footerGalleryStartX = 0;
    let footerGalleryStartScrollLeft = 0;
    let footerGalleryDragDistance = 0;
    let footerGalleryPressedImage = null;

    footerGallery.addEventListener('pointerdown', (event) => {
        isFooterGalleryDragging = true;
        footerGalleryStartX = event.clientX;
        footerGalleryStartScrollLeft = footerGallery.scrollLeft;
        footerGalleryDragDistance = 0;
        footerGalleryPressedImage = event.target.closest('[data-gallery-thumb], [data-gallery-video]');
        footerGallery.classList.add('is-dragging');
        footerGallery.setPointerCapture(event.pointerId);
    });

    footerGallery.addEventListener('pointermove', (event) => {
        if (!isFooterGalleryDragging) {
            return;
        }
        const distance = event.clientX - footerGalleryStartX;
        footerGalleryDragDistance = Math.max(footerGalleryDragDistance, Math.abs(distance));
        footerGallery.scrollLeft = footerGalleryStartScrollLeft - distance;
    });

    /**
     * Ends footer-gallery dragging and opens the pressed item when movement was minimal.
     * @param {PointerEvent|MouseEvent} event - Pointer event that ended the drag.
     */
    function stopFooterGalleryDrag(event) {
        const pressedImage = footerGalleryPressedImage;
        const shouldOpenImage = pressedImage && footerGalleryDragDistance <= 16;
        isFooterGalleryDragging = false;
        footerGalleryPressedImage = null;
        footerGallery.classList.remove('is-dragging');

        if (shouldOpenImage) {
            event.preventDefault();
            event.stopPropagation();
            const galleryItems = [...footerGalleryImages, ...footerGalleryVideos];
            const footerIndex = galleryItems.indexOf(pressedImage);
            if (footerIndex !== -1) {
                selectFooterImage(footerIndex);
                if (pressedImage.matches('[data-gallery-video]')) {
                    openVideoZoom(pressedImage);
                } else {
                    openImageZoom(pressedImage);
                }
            }
        }
    }

    footerGallery.addEventListener('pointerup', stopFooterGalleryDrag);
    footerGallery.addEventListener('pointercancel', stopFooterGalleryDrag);
    footerGallery.addEventListener('mouseleave', () => {
        if (isFooterGalleryDragging) {
            stopFooterGalleryDrag();
        }
    });

    footerGallery.addEventListener('click', (event) => {
        if (footerGalleryDragDistance > 16) {
            event.preventDefault();
            event.stopPropagation();
            footerGalleryDragDistance = 0;
            return;
        }
        footerGalleryDragDistance = 0;
    }, true);

    footerGallery.addEventListener('click', (event) => {
        if (imageZoomModal.classList.contains('is-open')) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const galleryItem = event.target.closest('[data-gallery-thumb], [data-gallery-video]');
        if (!galleryItem) {
            return;
        }
        const galleryItems = [...footerGalleryImages, ...footerGalleryVideos];
        const footerIndex = galleryItems.indexOf(galleryItem);
        if (footerIndex !== -1) {
            event.preventDefault();
            selectFooterImage(footerIndex);
            if (galleryItem.matches('[data-gallery-video]')) {
                openVideoZoom(galleryItem);
            } else {
                openImageZoom(galleryItem);
            }
        }
    });
}

footerGalleryImages.forEach((image, index) => {
    image.addEventListener('click', (event) => {
        if (imageZoomModal.classList.contains('is-open')) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        selectFooterImage(index);
        openImageZoom(image);
    });
});

footerGalleryVideos.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        if (imageZoomModal.classList.contains('is-open')) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        selectFooterImage(footerGalleryImages.length + index);
        openVideoZoom(button);
    });
});

imageZoomModal.addEventListener('wheel', (event) => {
    if (!imageZoomModal.classList.contains('is-open')) {
        return;
    }
    event.preventDefault();
    const rect = imageZoomTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    const currentScale = Number(imageZoomTarget.dataset.zoomScale || '1');
    const nextScale = event.deltaY < 0
        ? Math.min(2.4, currentScale + 0.18)
        : Math.max(1, currentScale - 0.18);
    imageZoomTarget.dataset.zoomScale = String(nextScale);
    imageZoomTarget.style.transformOrigin = `${x}% ${y}%`;
    imageZoomTarget.style.transform = `scale(${nextScale})`;
}, { passive: false });

videoZoomTarget.addEventListener('click', () => {
    if (videoZoomTarget.paused) {
        videoZoomTarget.play();
    } else {
        videoZoomTarget.pause();
    }
});

galleryScrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const galleryItems = [...footerGalleryImages, ...footerGalleryVideos];
        if (!galleryItems.length) {
            return;
        }
        const direction = button.dataset.galleryScroll === 'next' ? 1 : -1;
        selectFooterImage(selectedFooterImageIndex + direction);
    });
});

selectFooterImage(0);

/**
 * Sends a form-submit event to Google Analytics when gtag is available.
 * @param {string} formName - Analytics form identifier.
 */
function trackFormSubmit(formName) {
    if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
            form_name: formName
        });
    }
}

/**
 * Updates the status message attached to a form.
 * @param {HTMLFormElement} form - Form containing a .form-status node.
 * @param {string} message - Message to show.
 * @param {'success'|'error'} [state] - Optional visual state.
 */
function setFormStatus(form, message, state) {
    const status = form.querySelector('.form-status');
    if (!status) {
        return;
    }
    status.textContent = message;
    status.classList.remove('is-success', 'is-error');
    if (state) {
        status.classList.add(`is-${state}`);
    }
}

/**
 * Converts form data into a mailto link and opens the visitor's email client.
 * @param {HTMLFormElement} form - Form to enhance.
 * @param {string} formName - Analytics form identifier.
 */
function handleEmailFormSubmit(form, formName) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        trackFormSubmit(formName);

        const formData = new FormData(form);
        const subject = formData.get('_subject') || 'New SphynxVision website inquiry';
        const bodyLines = [];

        formData.forEach((value, key) => {
            if (key === '_subject') {
                return;
            }
            bodyLines.push(`${key}: ${value}`);
        });

        const mailtoUrl = `mailto:${formEmailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        window.location.href = mailtoUrl;
        setFormStatus(form, 'Your email app will open with the form details. Please send the email to complete the inquiry.', 'success');
    });
}

handleEmailFormSubmit(contactForm, 'contact_us');
handleEmailFormSubmit(betaAccessForm, 'pioneer_program_early_access');

betaModal.addEventListener('click', (event) => {
    if (event.target === betaModal) {
        closeBetaModal();
    }
});

betaFormModal.addEventListener('click', (event) => {
    if (event.target === betaFormModal) {
        closeBetaFormModal();
    }
});

testimonialsModal.addEventListener('click', (event) => {
    if (event.target === testimonialsModal) {
        closeTestimonialsModal();
    }
});

imageZoomModal.addEventListener('click', (event) => {
    if (event.target === imageZoomModal) {
        closeImageZoom();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && betaModal.classList.contains('is-open')) {
        closeBetaModal();
    }

    if (event.key === 'Escape' && betaFormModal.classList.contains('is-open')) {
        closeBetaFormModal();
    }

    if (event.key === 'Escape' && testimonialsModal.classList.contains('is-open')) {
        closeTestimonialsModal();
    }

    if (event.key === 'Escape' && imageZoomModal.classList.contains('is-open')) {
        closeImageZoom();
    }
});

