document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const applicationDialog = document.getElementById('applicationDialog');
    const applicationDialogTitle = document.getElementById('applicationDialogTitle');
    const applicationDialogDescription = document.getElementById('applicationDialogDescription');
    const applicationDialogUsers = document.getElementById('applicationDialogUsers');
    const applicationDialogEmpty = document.getElementById('applicationDialogEmpty');
    const closeApplicationDialog = document.getElementById('closeApplicationDialog');
    const themeToggle = document.getElementById('themeToggle');
    const applicationTrack = document.getElementById('applicationTrack');
    const applicationSearchForm = document.getElementById('applicationSearchForm');
    const applicationSearchInput = document.getElementById('applicationSearchInput');
    const applicationSearchEmpty = document.getElementById('applicationSearchEmpty');
    const clientTrack = document.getElementById('clientTrack');

    const updateTheme = isDark => {
        document.body.classList.toggle('dark-theme', isDark);
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
        themeToggle.title = isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap';
        themeToggle.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    };

    let isDarkTheme = false;
    try {
        isDarkTheme = localStorage.getItem('accessMediaTheme') === 'dark';
    } catch (error) {
        console.error('Preferensi tema tidak dapat dibaca dari penyimpanan browser.', error);
    }
    updateTheme(isDarkTheme);

    themeToggle.addEventListener('click', () => {
        isDarkTheme = !document.body.classList.contains('dark-theme');
        updateTheme(isDarkTheme);

        try {
            localStorage.setItem('accessMediaTheme', isDarkTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Preferensi tema tidak dapat disimpan di browser.', error);
        }
    });

    if (clientTrack) {
        const originalGroup = document.createElement('div');
        originalGroup.className = 'client-track-group';
        originalGroup.append(...Array.from(clientTrack.children));

        const duplicateGroup = originalGroup.cloneNode(true);
        duplicateGroup.setAttribute('aria-hidden', 'true');
        duplicateGroup.querySelectorAll('img').forEach(image => image.alt = '');

        clientTrack.append(originalGroup, duplicateGroup);
    }

    if (applicationSearchForm && applicationSearchInput && applicationTrack && applicationSearchEmpty) {
        const filterApplications = () => {
            const searchTerm = applicationSearchInput.value.trim().toLocaleLowerCase();
            let visibleApplications = 0;

            applicationTrack.querySelectorAll('[data-app]').forEach(card => {
                const matches = card.textContent.toLocaleLowerCase().includes(searchTerm);
                card.hidden = !matches;
                if (matches) visibleApplications += 1;
            });

            applicationSearchEmpty.classList.toggle('hidden', visibleApplications > 0);
        };

        applicationSearchInput.addEventListener('input', filterApplications);
        applicationSearchForm.addEventListener('submit', event => {
            event.preventDefault();
            filterApplications();
        });
    }

    const applicationDetails = {
        meubel: {
            description: 'Aplikasi untuk membantu toko meubel mengelola penjualan dan operasional, seperti pencatatan transaksi serta pemantauan barang dan stok.',
            users: ['Karya Jaya Abadi', 'Terus Jaya Furniture']
        },
        petshop: {
            description: 'Aplikasi untuk membantu operasional petshop, termasuk pencatatan penjualan produk dan layanan, pengelolaan persediaan, serta pemantauan transaksi.',
            users: [
                'JUANDA PetShop', 'ALESHA PetShop', 'JS PetShop', 'JB Petshop',
                'JR PetShop', 'JJ PetShop', 'JC Petshop', 'Jaya Kelinci PetShop',
                'JP Petshop', 'KIA Petshop', 'JG Petshop', 'Amazon Garden',
                'Laras Group', 'Master Petshop', 'Alaska Petshop', 'JN Petshop',
                'JK Petshop', 'Gudang Petshop', 'Petshop Soponyono', 'JD Petshop',
                'JT Petshop'
            ]
        },
        bengkel: {
            description: 'Aplikasi untuk membantu bengkel motor mencatat transaksi servis dan penjualan suku cadang, serta mengelola persediaan dan data operasional bengkel.',
            users: ['Budi Motor Tasikmalaya']
        },
        'body-repair': {
            description: 'Aplikasi untuk membantu usaha body repair mencatat pekerjaan perbaikan kendaraan, memantau progres layanan, dan mengelola transaksi.',
            users: ['Tasik Oto Prima (TOP)']
        },
        bangunan: {
            description: 'Aplikasi untuk membantu toko bangunan mengelola transaksi penjualan, persediaan bahan bangunan, dan pencatatan operasional toko.',
            users: ['TB Anugrah Cilegon', 'Stell Indonesia']
        },
        minimarket: {
            description: 'Aplikasi untuk membantu mini market mencatat penjualan, mengelola stok barang, dan memantau transaksi harian.',
            users: ['Harapan Putra', 'Sukasari', 'Berkah Syawal', 'Arjuna Pusat Oleh-oleh']
        },
        grosir: {
            description: 'Aplikasi untuk membantu usaha depo dan grosir mengelola penjualan barang dalam jumlah besar, persediaan, serta pencatatan transaksi.',
            users: ['CV. Niaga Sejahtera', 'Grosir Berkah Jaya']
        },
        'distributor-buku': {
            description: 'Aplikasi untuk membantu distributor buku mengelola persediaan, pencatatan pesanan, penjualan, dan transaksi distribusi.',
            users: ['SMARTNEUTRON']
        },
        'keuangan-yayasan': {
            description: 'Aplikasi untuk membantu yayasan mencatat pemasukan dan pengeluaran serta menyusun pemantauan keuangan secara lebih teratur.',
            users: ['Al-Hasan', 'BMT Al-Muhajirin']
        },
        farmasi: {
            description: 'Aplikasi untuk membantu operasional farmasi dalam mencatat penjualan, mengelola persediaan produk, dan memantau transaksi.',
            users: ['Dinas Kesehatan Kabupaten Subang']
        },
        penggajian: {
            description: 'Aplikasi untuk membantu pencatatan data karyawan dan proses penggajian agar administrasi gaji lebih terorganisasi.',
            users: []
        },
        'toko-komputer': {
            description: 'Aplikasi untuk membantu toko komputer mengelola penjualan perangkat dan aksesori, persediaan barang, serta transaksi toko.',
            users: ['ABM Computer']
        }
    };

    // Toggle menu dropdown saat tombol hamburger di-klik pada perangkat mobile
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Otomatis menutup menu saat salah satu link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    document.querySelectorAll('.nav-btn').forEach(link => {
        link.addEventListener('click', () => setActiveSection(link.dataset.target));
    });

    const pageSections = ['home', 'tentang', 'layanan', 'aplikasi', 'klien']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const sectionNavigationLinks = document.querySelectorAll('.nav-btn, #mobileMenu a[data-target]');

    const setActiveSection = sectionId => {
        sectionNavigationLinks.forEach(link => {
            const target = link.dataset.target || link.getAttribute('href').slice(1);
            const isActive = target === sectionId;

            link.classList.toggle('text-brand-purple', isActive);
            link.classList.toggle('font-bold', isActive);
            link.classList.toggle('text-gray-600', !isActive);

            if (link.classList.contains('nav-btn')) {
                link.classList.toggle('bg-purple-50', isActive);
                link.classList.toggle('shadow-sm', isActive);
            }

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    let scrollUpdateScheduled = false;
    const updateActiveSectionFromScroll = () => {
        if (scrollUpdateScheduled) return;
        scrollUpdateScheduled = true;

        window.requestAnimationFrame(() => {
            const headerHeight = document.querySelector('header').offsetHeight;
            const activationLine = headerHeight + 40;
            let currentSection = pageSections[0];

            pageSections.forEach(section => {
                if (section.getBoundingClientRect().top <= activationLine) {
                    currentSection = section;
                }
            });

            if (currentSection) setActiveSection(currentSection.id);
            scrollUpdateScheduled = false;
        });
    };

    window.addEventListener('scroll', updateActiveSectionFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveSectionFromScroll);
    updateActiveSectionFromScroll();

    document.querySelectorAll('[data-app]').forEach(button => {
        button.addEventListener('click', () => {
            const details = applicationDetails[button.dataset.app];
            const appName = button.querySelector('span').textContent;

            applicationDialogTitle.textContent = appName;
            applicationDialogDescription.textContent = details.description;
            applicationDialogUsers.replaceChildren();

            if (details.users.length > 0) {
                applicationDialogEmpty.classList.add('hidden');
                details.users.forEach(user => {
                    const item = document.createElement('li');
                    item.className = 'rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700';
                    item.textContent = user;
                    applicationDialogUsers.append(item);
                });
            } else {
                applicationDialogEmpty.textContent = 'Informasi pengguna untuk aplikasi ini belum tersedia.';
                applicationDialogEmpty.classList.remove('hidden');
            }

            applicationDialog.showModal();
        });
    });

    closeApplicationDialog.addEventListener('click', () => applicationDialog.close());

    applicationDialog.addEventListener('click', event => {
        if (event.target === applicationDialog) {
            applicationDialog.close();
        }
    });
});