// 婚礼邀请函H5长页 - 交互脚本
// 功能：倒计时、表单提交、导航交互、图片懒加载等

document.addEventListener('DOMContentLoaded', function() {
    // ===== 初始化函数 =====
    initCountdown();
    initNavigation();
    initRSVPForm();
    initSmoothScroll();
    initLazyLoading();
    initActiveNav();
    initBackgroundMusic();
    
    // ===== 倒计时功能 =====
    function initCountdown() {
        // 设置婚礼日期：2026年5月4日 12:00 (午宴)
        const weddingDate = new Date('2026-05-04T12:00:00');
        
        function updateCountdown() {
            const now = new Date();
            const timeRemaining = weddingDate - now;
            
            if (timeRemaining <= 0) {
                // 婚礼已开始或已过去
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            // 计算天、时、分、秒
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // 更新显示
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // 添加动画效果
            animateCountdown();
        }
        
        function animateCountdown() {
            const numbers = document.querySelectorAll('.countdown-number');
            numbers.forEach(number => {
                number.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                }, 300);
            });
        }
        
        // 立即更新一次
        updateCountdown();
        
        // 每秒更新
        setInterval(updateCountdown, 1000);
    }
    
    // ===== 导航功能 =====
    function initNavigation() {
        // 顶部导航按钮交互
        const topNavButtons = document.querySelectorAll('.h5-nav .nav-button');
        topNavButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.querySelector('span').textContent;
                handleNavClick(buttonText);
            });
        });
        
        // 底部导航按钮交互
        const bottomNavButtons = document.querySelectorAll('.bottom-nav .nav-button');
        bottomNavButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target') || this.querySelector('span').textContent;
                scrollToSection(target);
                setActiveNav(this);
            });
        });
        
        // 导航前往按钮
        const navButton = document.querySelector('.navigation-button');
        if (navButton) {
            navButton.addEventListener('click', function() {
                // 使用高德地图短链接 - 阜阳宝龙温德姆至尊豪庭酒店
                const amapUrl = 'https://surl.amap.com/EgMA0Cj88f';
                window.open(amapUrl, '_blank');
                
                // 显示提示
                showToast('正在打开高德地图导航...');
            });
        }
        
        function handleNavClick(action) {
            switch(action) {
                case '祝福留言':
                    showMessageModal();
                    break;
                case '烟火贺喜':
                    launchFireworks();
                    break;
                case '永结同心':
                    showLoveAnimation();
                    break;
                default:
                    console.log('导航点击:', action);
            }
        }
    }
    
    // ===== RSVP表单功能 =====
    function initRSVPForm() {
        const rsvpForm = document.querySelector('.rsvp-form');
        if (!rsvpForm) return;
        
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const guestsInput = document.getElementById('guests');
            
            // 表单验证
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                return;
            }
            
            if (!guestsInput.value || parseInt(guestsInput.value) < 1) {
                showError(guestsInput, '请输入正确的出席人数');
                return;
            }
            
            // 跳转到问卷星表单
            const wjxUrl = 'https://v.wjx.cn/vm/rXjEUD7.aspx';
            window.open(wjxUrl, '_blank');
            
            // 显示提示
            showToast('正在打开宾客回执表单...');
            
            // 清空表单
            rsvpForm.reset();
        });
        
        // 输入框实时验证
        const inputs = rsvpForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
    
    // ===== 平滑滚动 =====
    function initSmoothScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        // 创建观察器，用于高亮当前部分
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    setActiveNavBySection(id);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // ===== 图片懒加载 =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            imageObserver.observe(img);
        });
    }
    
    // ===== 激活导航高亮 =====
    function initActiveNav() {
        // 根据URL哈希设置初始激活状态
        const hash = window.location.hash.substring(1);
        if (hash) {
            setActiveNavBySection(hash);
        } else {
            // 默认激活第一个导航按钮
            const firstNav = document.querySelector('.bottom-nav .nav-button');
            if (firstNav) {
                firstNav.classList.add('active');
            }
        }
    }
    
    // ===== 辅助函数 =====
    function scrollToSection(target) {
        let sectionId;
        
        switch(target) {
            case '首页':
            case 'home':
                sectionId = 'cover';
                break;
            case '故事':
            case 'story':
                sectionId = 'story';
                break;
            case '地点':
            case 'location':
                sectionId = 'location';
                break;
            case '回执':
            case 'rsvp':
                sectionId = 'rsvp';
                break;
            default:
                sectionId = target.toLowerCase();
        }
        
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // 更新URL哈希（不触发页面跳转）
            history.pushState(null, null, `#${sectionId}`);
        }
    }
    
    function setActiveNav(activeButton) {
        // 移除所有激活状态
        document.querySelectorAll('.bottom-nav .nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 添加激活状态到当前按钮
        activeButton.classList.add('active');
    }
    
    function setActiveNavBySection(sectionId) {
        const navButtons = document.querySelectorAll('.bottom-nav .nav-button');
        navButtons.forEach(button => {
            const target = button.getAttribute('data-target') || 
                          button.querySelector('span').textContent.toLowerCase();
            
            button.classList.remove('active');
            
            if ((target === '首页' && sectionId === 'cover') ||
                (target === '故事' && sectionId === 'story') ||
                (target === '地点' && sectionId === 'location') ||
                (target === '回执' && sectionId === 'rsvp')) {
                button.classList.add('active');
            }
        });
    }
    
    function showError(input, message) {
        clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#C62828';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = '#C62828';
        
        // 3秒后自动清除错误信息
        setTimeout(() => clearError(input), 3000);
    }
    
    function clearError(input) {
        const errorDiv = input.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '#C62828'; // 恢复红色边框
    }
    
    function showSuccessMessage(formData) {
        // 创建成功消息弹窗
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '2rem';
        modal.style.borderRadius = '16px';
        modal.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        modal.style.zIndex = '1000';
        modal.style.textAlign = 'center';
        modal.style.maxWidth = '90%';
        modal.style.width = '400px';
        
        modal.innerHTML = `
            <div style="font-size: 3rem; color: #8A9A5B; margin-bottom: 1rem;">💌</div>
            <h3 style="color: #333; margin-bottom: 1rem;">回执提交成功！</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">
                感谢 <strong>${formData.name}</strong> 的确认！<br>
                我们已记录您将携带 <strong>${formData.guests}</strong> 位宾客出席。
            </p>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 1.5rem;">
                期待在婚礼上与您相见！
            </p>
            <button class="close-modal-btn" style="
                background-color: #C62828;
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">确定</button>
        `;
        
        document.body.appendChild(modal);
        
        // 添加背景遮罩
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        document.body.appendChild(overlay);
        
        // 关闭按钮事件
        modal.querySelector('.close-modal-btn').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
        
        // 点击遮罩关闭
        overlay.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
        
        // 5秒后自动关闭
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            }
        }, 5000);
    }
    
    function showMessageModal() {
        const modal = document.createElement('div');
        modal.className = 'message-modal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '2rem';
        modal.style.borderRadius = '16px';
        modal.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        modal.style.zIndex = '1000';
        modal.style.maxWidth = '90%';
        modal.style.width = '400px';
        
        modal.innerHTML = `
            <h3 style="color: #333; margin-bottom: 1rem; text-align: center;">留下您的祝福</h3>
            <textarea placeholder="写下您的祝福语..." style="
                width: 100%;
                height: 120px;
                padding: 1rem;
                border: 1px solid #8A9A5B;
                border-radius: 8px;
                font-family: inherit;
                font-size: 1rem;
                resize: none;
                margin-bottom: 1rem;
            "></textarea>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="send-message-btn" style="
                    background-color: #C62828;
                    color: white;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    flex: 1;
                ">发送祝福</button>
                <button class="cancel-message-btn" style="
                    background-color: transparent;
                    color: #666;
                    border: 1px solid #ddd;
                    padding: 0.8rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    flex: 1;
                ">取消</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';
        document.body.appendChild(overlay);
        
        // 事件处理
        modal.querySelector('.send-message-btn').addEventListener('click', function() {
            const message = modal.querySelector('textarea').value.trim();
            if (message) {
                showToast('祝福已发送！感谢您的祝福～');
                document.body.removeChild(modal);
                document.body.removeChild(overlay);
            } else {
                showToast('请先写下祝福语哦～');
            }
        });
        
        modal.querySelector('.cancel-message-btn').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
        
        overlay.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.removeChild(overlay);
        });
    }
    
    function launchFireworks() {
        showToast('🎆 烟花绽放中... 祝福新人永结同心！');
        
        // 创建烟花效果
        const colors = ['#C62828', '#8A9A5B', '#FFD700', '#FFFFFF'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFirework(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }
    
    function createFirework(color) {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.width = '6px';
        firework.style.height = '6px';
        firework.style.backgroundColor = color;
        firework.style.borderRadius = '50%';
        firework.style.zIndex = '10000';
        firework.style.pointerEvents = 'none';
        
        // 随机位置
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        
        document.body.appendChild(firework);
        
        // 爆炸效果
        firework.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(3)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // 移除元素
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1000);
    }
    
    function showLoveAnimation() {
        showToast('💖 永结同心，百年好合！');
        
        // 创建爱心动画
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createHeart(), i * 200);
        }
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '10000';
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        
        // 随机起始位置（底部）
        const startX = Math.random() * window.innerWidth;
        heart.style.left = `${startX}px`;
        heart.style.bottom = '0';
        
        document.body.appendChild(heart);
        
        // 动画
        const animation = heart.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 3000,
            easing: 'ease-in'
        });
        
        // 移除元素
        animation.onfinish = () => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        };
    }
    
    function showToast(message) {
        // 移除已有的toast
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '8px';
        toast.style.zIndex = '10000';
        toast.style.fontSize = '1rem';
        toast.style.whiteSpace = 'nowrap';
        
        document.body.appendChild(toast);
        
        // 3秒后移除
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
    
    // ===== 添加一些CSS样式到页面 =====
    const style = document.createElement('style');
    style.textContent = `
        .toast-message {
            animation: toastFade 3s ease forwards;
        }
        
        @keyframes toastFade {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        .success-modal {
            animation: modalFadeIn 0.3s ease;
        }
        
        .message-modal {
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
        
        /* 为导航按钮添加点击效果 */
        .nav-button:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
    
    // ===== 页面加载完成的动画 =====
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // ===== 背景音乐控制功能 =====
    function initBackgroundMusic() {
        const bgMusic = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');
        
        if (!bgMusic || !musicToggle) {
            console.log('音乐元素或按钮未找到');
            return;
        }
        
        let isPlaying = false;
        
        // 点击音乐图标切换播放/暂停
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                showToast('音乐已暂停 🎵');
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    showToast('音乐开始播放 🎵');
                }).catch(error => {
                    console.log('音乐播放失败:', error);
                    showToast('无法播放音乐，请稍后再试');
                });
            }
            isPlaying = !isPlaying;
        });
        
        // 添加音乐图标动画样式
        const musicStyle = document.createElement('style');
        musicStyle.textContent = `
            #music-toggle {
                cursor: pointer;
                transition: all 0.3s ease;
                animation: none;
            }
            
            #music-toggle:hover {
                transform: scale(1.1);
                color: #C62828;
            }
            
            #music-toggle.playing {
                animation: rotate 2s linear infinite;
                color: #C62828;
            }
            
            @keyframes rotate {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(musicStyle);
        
        // 设置音乐音量
        bgMusic.volume = 0.5;
        
        console.log('%c🎵 背景音乐已加载，点击右上角音乐图标播放', 'color: #8A9A5B; font-size: 12px;');
    }
    
    // 控制台欢迎信息
    console.log('%c💝 孙鸣航 & 顾紫薇 婚礼邀请函 💝', 'color: #C62828; font-size: 18px; font-weight: bold;');
    console.log('%c感谢您的到来，愿爱与美好常伴您左右！', 'color: #8A9A5B; font-size: 14px;');
});
