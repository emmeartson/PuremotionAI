import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BadgeCheck, ArrowRight, Check, Clock, PenLine, Lock } from "lucide-react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer"


const whoOptions = [
    { id: "parents", label: "My Parents or Grandparents", thumb: "/myparents.jpg" },
    { id: "missed", label: "Someone I Miss", thumb: "/someoneimiss.jpg" },
    { id: "children", label: "My Children", thumb: "/mychildren.jpg" },
    { id: "partner", label: "My Partner", thumb: "/mypartner.jpg" },
    { id: "pet", label: "My Pet", thumb: "/mypet.jpg" },
    { id: "other", label: "Other", thumb: "/other.jpg" },
];

const memoryOptions = [
    { id: "loved-one", emoji: "❤️", label: "A Loved One I Miss", helper: "Bring back a meaningful connection." },
    { id: "family", emoji: "👵", label: "Family Memory", helper: "Moments shared with family members." },
    { id: "wedding", emoji: "💍", label: "Wedding or Anniversary", helper: "Relive one of life's most special days." },
    { id: "pet", emoji: "🐶", label: "A Beloved Pet", helper: "See your companion come alive again." },
    { id: "childhood", emoji: "👶", label: "Childhood Memory", helper: "Revisit treasured moments from the past." },
    { id: "special", emoji: "🎉", label: "A Special Moment", helper: "Birthdays, celebrations and milestones." },
    { id: "other", emoji: "✨", label: "Something Else Meaningful", helper: "Every memory deserves to be remembered." },
];

const memoryPriority = {
    parents: ["family", "loved-one", "wedding"],
    pet: ["pet", "special", "other"],
    partner: ["wedding", "loved-one", "special"],
    children: ["childhood", "family", "special"],
    missed: ["loved-one", "family", "other"],
};

function orderedMemoryOptions(whoId) {
    if (!whoId || !memoryPriority[whoId]) return memoryOptions;
    const priority = memoryPriority[whoId];
    const prioritised = priority
        .map((id) => memoryOptions.find((o) => o.id === id))
        .filter((o) => Boolean(o));
    const rest = memoryOptions.filter((o) => !priority.includes(o.id));
    return [...prioritised, ...rest];
}

function Quiz() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [who, setWho] = useState(null);
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Persist answers so other pages can reference if needed
    useEffect(() => {
        if (who || memory) {
            try {
                localStorage.setItem("pm_quiz", JSON.stringify({ who, memory }));
            } catch { }
        }
    }, [who, memory]);

    const next = () => setStep((s) => Math.min(3, s + 1));
    const back = () => setStep((s) => Math.max(1, s - 1));
    const finish = () => navigate("/flashback");

    const total = 2;

    return (
        <div className="h-auto min-h-0 bg-background">
            <header className="sticky top-0 z-50 border-b border-[#e6d8c4] bg-[#fff] py-4 flex justify-center">
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="PureMotion logo"
                        className="h-7 sm:h-8 w-auto"
                    />
                </Link>
            </header>

            <main className="mx-auto max-w-5xl px-5 pt-5 pb-8 sm:px-8 sm:pt-8 sm:pb-10">
                {step === 1 && (
                    <StepCard>
                        <div className="flex items-center justify-between gap-4">
                            <Eyebrow className="text-2xl">QUESTION 1 OF {total}</Eyebrow>
                            <StepDots current={step} total={total} />
                        </div>
                        <h1 className="mt-3 font-serif text-3xl text-balance sm:text-5xl">
                            Who would you love to <span className="italic text-[#634910]">bring to life</span> in your photo?
                        </h1>
                        <p className="mt-3 text-muted-foreground">
                            Select the memory closest to your heart and we'll tailor the experience for you.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {whoOptions.map((o) => (
                                <OptionButton
                                    key={o.id}
                                    selected={who === o.id}
                                    onClick={() => { setWho(o.id); setTimeout(next, 380); }}
                                >
                                    <img
                                        src={o.thumb}
                                        alt=""
                                        loading="lazy"
                                        width={64}
                                        height={64}
                                        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[#8B6A2B]/15"
                                    />
                                    <span className="flex-1 text-base font-medium sm:text-[17px]">{o.label}</span>
                                    <span
                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${who === o.id
                                            ? "scale-100 border-[#8B6A2B] bg-[#8B6A2B] text-white opacity-100"
                                            : "scale-75 border-border bg-transparent text-transparent opacity-0"
                                            }`}
                                    >
                                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    </span>
                                </OptionButton>
                            ))}
                        </div>
                    </StepCard>
                )}

                {step === 2 && (
                    <StepCard>
                        <div className="flex items-center justify-between gap-4">
                            <Eyebrow>QUESTION 2 OF {total}</Eyebrow>
                            <StepDots current={step} total={total} />
                        </div>
                        <h1 className="mt-3 font-serif text-[1.65rem] leading-tight text-balance sm:text-[2.75rem]">
                            Which memory would you love to <span className="italic text-[#8B6A2B]">revisit</span>?
                        </h1>
                        <p className="mt-3 max-w-[85%] text-muted-foreground/90">
                            Choose the memory that means the most to you. We'll help bring it back to life.
                        </p>
                        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                            {orderedMemoryOptions(who).map((o) => (
                                <OptionButton
                                    key={o.id}
                                    selected={memory === o.id}
                                    onClick={() => { setMemory(o.id); setTimeout(next, 320); }}
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8B6A2B]/10 text-2xl" aria-hidden>
                                        {o.emoji}
                                    </span>
                                    <span className="block text-base font-medium sm:text-[17px]">{o.label}</span>
                                    <span
                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${memory === o.id
                                            ? "scale-100 border-[#8B6A2B] bg-[#8B6A2B] text-white opacity-100"
                                            : "scale-75 border-border bg-transparent text-transparent opacity-0"
                                            }`}
                                    >
                                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    </span>
                                </OptionButton>
                            ))}
                        </div>
                    </StepCard>
                )}

                {step === 3 && (
                    <StepCard>



                        <Eyebrow>Here's what happens next</Eyebrow>
                        <h1 className="mt-3 font-serif text-[1.75rem] leading-tight text-balance sm:text-5xl">
                            See a precious memory <span className="italic text-[#8B6A2B]">come alive</span> again.
                        </h1>
                        <p className="mt-2.5 max-w-xl text-[15px] text-muted-foreground sm:text-base">
                            Upload your photo and watch it become a moving memory in under 30 seconds.
                        </p>

                        {/* Before → After */}
                        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
                            <figure className="overflow-hidden rounded-[20px] border border-border bg-cream shadow-soft">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#2B2118]">
                                    <img src="/couple-before.jpg" alt="Before" loading="lazy" className="h-full w-full object-cover grayscale" />
                                    <span className="absolute left-2 top-2 rounded-full bg-[#2B2118]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">Before</span>
                                </div>
                            </figure>
                            <figure className="overflow-hidden rounded-[20px] border border-[#8B6A2B]/40 bg-cream shadow-elegant">
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#2B2118]">
                                    <video
                                        src="/couple-after.mp4"
                                        poster="/couple-before.jpg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="h-full w-full object-cover"
                                    />
                                    <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                                        After
                                    </span>
                                </div>
                            </figure>
                        </div>

                        {/* Social proof */}
                        <div className="mt-4 flex items-center justify-center gap-4 text-[13px] sm:gap-6">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[#C9A227]" aria-hidden>★★★★★</span>
                                <span className="font-semibold">4.8/5 Rating</span>
                            </div>
                            <div className="font-semibold text-muted-foreground">
                                8,000+ Memories Created
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div className="mt-4 rounded-2xl border border-border bg-card p-4 text-left shadow-soft">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">Emily R.</p>
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
                                    <BadgeCheck className="h-3 w-3" /> Verified Customer
                                </span>
                            </div>
                            <p className="mt-2 text-[14px] leading-relaxed text-foreground/90">
                                "I uploaded a photo of me and my husband from 1985 and seeing him smile back at me again brought tears to my eyes. It felt like that moment came alive all over again."
                            </p>
                        </div>

                        <div className="mt-5 flex justify-center">
                            <button
                                onClick={finish}
                                className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_30px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F]"
                                style={{ minHeight: 56 }}
                            >
                                Continue <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mt-2 text-center text-[12px] text-muted-foreground/80">Next step: Upload your photo</p>

                        <ul className="mx-auto mt-4 grid max-w-sm gap-2 text-[13px] text-muted-foreground">
                            <li className="flex items-center gap-2.5">
                                <Clock className="h-4 w-4 text-[#8B6A2B]" strokeWidth={2} />
                                Upload takes less than 30 seconds
                            </li>
                            <li className="flex items-center gap-2.5">
                                <PenLine className="h-4 w-4 text-[#8B6A2B]" strokeWidth={2} />
                                No editing skills required
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Lock className="h-4 w-4 text-[#8B6A2B]" strokeWidth={2} />
                                Private &amp; secure
                            </li>
                        </ul>
                    </StepCard>
                )}
            </main>
            <Footer />
        </div>
    );
}

function StepCard({ children }) {
    return <div className="fade-up">{children}</div>;
}

function Eyebrow({ children }) {
    return <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">{children}</p>;
}

function StepDots({ current, total }) {
    return (
        <div className="flex items-center gap-1.5" aria-label={`Step ${current} of ${total}`}>
            {Array.from({ length: total }).map((_, i) => (
                <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i + 1 === current
                        ? "w-5 bg-[#8B6A2B]"
                        : i + 1 < current
                            ? "w-1.5 bg-[#8B6A2B]/60"
                            : "w-1.5 bg-border"
                        }`}
                />
            ))}
        </div>
    );
}

function OptionButton({
    selected, onClick, children,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`flex items-center gap-4 rounded-2xl border bg-card px-4 py-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99] sm:px-5 sm:py-4 ${selected
                ? "border-[#8B6A2B] bg-[#8B6A2B]/[0.06] shadow-[0_18px_36px_-14px_rgba(139,106,43,0.5)]"
                : "border-border shadow-soft hover:border-[#8B6A2B]/50"
                }`}
            style={{ minHeight: 72 }}
        >
            {children}
        </button>
    );
}

export default Quiz;