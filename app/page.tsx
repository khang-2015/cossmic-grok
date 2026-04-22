'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, Star, Bone, RefreshCw } from 'lucide-react';

export default function CosmicPaw() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [darkMode, setDarkMode] = useState(true);
    const [magicAnswer, setMagicAnswer] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [pastLife, setPastLife] = useState<any>(null);
    const [dogName, setDogName] = useState('');
    const [dogBreed, setDogBreed] = useState('');

    // Cosmic particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: any[] = [];
        class Particle {
            x: number; y: number; size: number; speed: number; opacity: number;
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height * 0.6;
                this.size = Math.random() * 2.5 + 0.5;
                this.speed = Math.random() * 0.4 + 0.15;
                this.opacity = Math.random() * 0.7 + 0.3;
            }
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = darkMode
                    ? `rgba(167, 139, 250, ${this.opacity})`
                    : `rgba(100, 80, 200, ${this.opacity * 0.8})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 180; i++) particles.push(new Particle());

        const animate = () => {
            ctx.fillStyle = darkMode ? 'rgba(10, 10, 31, 0.1)' : 'rgba(240, 240, 255, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [darkMode]);

    // Magic 8-Ball answers (funny dog version)
    const dogAnswers = [
        "Woof! Definitely yes, treat incoming! 🦴",
        "My tail says Outlook good... very waggy.",
        "Ask again after I finish this nap.",
        "Signs point to zoomies at 3AM.",
        "Yes, but only if you add cheese.",
        "Concentrate and ask while I'm chewing a bone.",
        "It is certain... you'll never find that sock again.",
        "My sources (other dogs) say no.",
        "Reply hazy, try petting me more.",
        "Without a doubt, but bring more toys.",
        "Better not tell you... it's a secret chew.",
        "You may rely on it – unless there's a cat.",
        "Cannot predict now, I'm chasing my tail.",
        "As I see it, yes... more belly rubs!",
        "Very doubtful... unless you open the door.",
        "Most likely... if you share your food.",
        "The spirits say: Squirrel!!!",
        "Don't count on it, human.",
        "Yes, and there will be many boops.",
        "My crystal ball is covered in fur... ask later."
    ];

    const shakeBall = () => {
        if (isShaking) return;
        setIsShaking(true);
        setMagicAnswer('');

        setTimeout(() => {
            const randomAnswer = dogAnswers[Math.floor(Math.random() * dogAnswers.length)];
            setMagicAnswer(randomAnswer);
            setIsShaking(false);
        }, 1200);
    };

    // Past Life Generator (fun & fake)
    const generatePastLife = () => {
        if (!dogName || !dogBreed) {
            alert("Hãy nhập tên và giống chó trước nhé! 🐶");
            return;
        }

        const pastLives = [
            `Trong kiếp trước, ${dogName} là một **chiến binh Viking** chuyên bảo vệ làng khỏi sói. Giống ${dogBreed} giải thích tại sao cậu ấy luôn canh gác cửa nhà bạn.`,
            `${dogName} từng là một **hoàng tử Ai Cập** được chôn cùng kim tự tháp. Linh hồn quay lại dưới hình hài ${dogBreed} để đòi lại đồ chơi của mình.`,
            `Kiếp trước ${dogName} là **siêu sao rock 'n roll** của thế giới chó. Đó là lý do cậu ấy thích sủa theo nhạc và lắc lư đuôi mạnh mẽ.`,
            `${dogName} từng là **thám tử Sherlock Holmes** phiên bản chó. Giống ${dogBreed} giúp cậu ấy ngửi ra mọi thứ... kể cả đồ ăn trộm.`,
            `Trong kiếp trước, ${dogName} là một **công chúa bị nguyền rủa** ở châu Âu. Lời nguyền biến nàng thành ${dogBreed} dễ thương như ngày hôm nay.`,
            `${dogName} là **phi công máy bay chiến đấu** thời Thế Chiến. Giờ cậu ấy vẫn thích chạy vòng vòng với tốc độ ánh sáng (zoomies).`,
            `Kiếp trước ${dogName} là một **ninja Nhật Bản** siêu lén lút. Đó là lý do cậu ấy hay biến mất khi bạn gọi tên.`
        ];

        const randomPast = pastLives[Math.floor(Math.random() * pastLives.length)];
        const funnyDetail = [
            "Cậu ấy vẫn giữ thói quen chôn đồ chơi như chôn kho báu.",
            "Bạn là người chủ mà cậu ấy đã chờ đợi qua nhiều kiếp.",
            "Kiếp này cậu ấy chọn bạn vì bạn cho ăn ngon hơn kiếp trước.",
            "Cậu ấy hay nằm sấp bụng vì đó là tư thế ngủ hoàng gia cũ."
        ][Math.floor(Math.random() * 4)];

        setPastLife({
            story: randomPast,
            detail: funnyDetail
        });
    };

    return (
        <div className={`min-h-screen overflow-hidden relative transition-colors duration-700 ${darkMode ? 'cosmic-bg text-white' : 'bg-gradient-to-br from-blue-50 to-purple-100 text-slate-900'}`}>
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Header with Mode Toggle */}
            <header className="relative z-10 flex justify-between items-center p-6">
                <div className="flex items-center gap-3">
                    <div className="text-4xl">🐾</div>
                    <div>
                        <h1 className={`text-3xl font-bold tracking-tighter ${darkMode ? 'neon-purple' : 'text-purple-700'}`}>
                            COSMIC PAW
                        </h1>
                        <p className="text-xs -mt-1 opacity-75">Bói Chó Tiền Kiếp • 2026 Edition</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-violet-400 transition-colors"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold flex items-center gap-2"
                    >
                        Đăng nhập <Sparkles className="w-5 h-5" />
                    </motion.button>
                </div>
            </header>

            {/* Hero */}
            <div className="relative z-10 text-center pt-16 pb-12 px-6">
                <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-4">
                    Khám phá kiếp trước<br />của boss nhà bạn
                </h2>
                <p className="max-w-lg mx-auto text-lg opacity-80">Thả lỏng. Hỏi. Và cười nghiêng ngả với những câu trả lời từ vũ trụ chó.</p>
            </div>

            {/* Interactive Sections */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-20">

                {/* Magic 8-Ball */}
                <div className="glass rounded-3xl p-8 border border-white/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-4xl">🎱</div>
                        <h3 className="text-3xl font-bold">Magic 8-Ball Chó</h3>
                    </div>
                    <p className="mb-6 opacity-75">Hỏi bất cứ điều gì về cún yêu. Lắc mạnh để nhận lời tiên tri!</p>

                    <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
                        <motion.div
                            animate={isShaking ? { rotate: [0, -25, 25, -15, 15, 0] } : {}}
                            transition={{ duration: 0.8 }}
                            className="w-52 h-52 bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/30 cursor-pointer"
                            onClick={shakeBall}
                        >
                            <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center text-center px-6">
                                <AnimatePresence mode="wait">
                                    {magicAnswer ? (
                                        <motion.p
                                            key="answer"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-white text-sm leading-tight font-medium"
                                        >
                                            {magicAnswer}
                                        </motion.p>
                                    ) : (
                                        <motion.div
                                            key="prompt"
                                            className="text-white/70 text-xs"
                                        >
                                            Lắc để xem tương lai 🐾
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>

                    <button
                        onClick={shakeBall}
                        disabled={isShaking}
                        className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all"
                    >
                        <RefreshCw className={`w-5 h-5 ${isShaking ? 'animate-spin' : ''}`} />
                        Lắc Magic Ball
                    </button>
                </div>

                {/* Past Life Generator */}
                <div className="glass rounded-3xl p-8 border border-white/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-4xl">🔮</div>
                        <h3 className="text-3xl font-bold">Kiếp Trước Của Cún</h3>
                    </div>

                    <div className="space-y-4 mb-6">
                        <input
                            type="text"
                            placeholder="Tên cún (ví dụ: Lucky)"
                            value={dogName}
                            onChange={(e) => setDogName(e.target.value)}
                            className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-2xl focus:outline-none focus:border-violet-400 placeholder:text-white/50"
                        />
                        <input
                            type="text"
                            placeholder="Giống chó (ví dụ: Golden Retriever)"
                            value={dogBreed}
                            onChange={(e) => setDogBreed(e.target.value)}
                            className="w-full px-5 py-3 bg-white/10 border border-white/30 rounded-2xl focus:outline-none focus:border-violet-400 placeholder:text-white/50"
                        />
                    </div>

                    <button
                        onClick={generatePastLife}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl font-semibold hover:brightness-110 transition"
                    >
                        Khám Phá Kiếp Trước ✨
                    </button>

                    <AnimatePresence>
                        {pastLife && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20"
                            >
                                <p className="leading-relaxed text-lg">{pastLife.story}</p>
                                <p className="mt-4 text-sm opacity-75 italic">— {pastLife.detail}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Keep the rest of your original features grid if you want, or let me know to expand more */}
            <div className="relative z-10 text-center py-12 text-sm opacity-60">
                Made with cosmic love for all good dogs 🐶🌌
            </div>
        </div>
    );
}