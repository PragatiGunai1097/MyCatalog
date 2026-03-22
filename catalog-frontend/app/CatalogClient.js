'use client'

import { useState, useEffect } from 'react'
import { urlFor } from '../lib/sanity'
import './globals.css'

export default function CatalogClient({ items, users}) {

  const [mapping, setMapping] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mapping') || 'price_first'
    }
    return 'price_first'
  })



  const [search, setSearch] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [view, setView] = useState('grid')

  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
  const el = document.getElementById('devtools-indicator');
  if (el) el.style.display = 'none';
}, []);
  
  useEffect(() => {
  const timer = setTimeout(() => {
    if (search.trim() !== '') {
      document.getElementById('Prodictid')?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, 400)

  return () => clearTimeout(timer)
}, [search])
  
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('user=true'))

    //New hero section logic

  // ================= REVEAL ANIMATION =================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => {
    observer.observe(el);
  });

  // ================= PARALLAX =================
  const hero = document.getElementById('hero');
  const grid = document.getElementById('parallax-grid');

  if (hero && grid && window.innerWidth >= 1024) {

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let animFrame;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      grid.style.transform =
        `perspective(1200px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;

      animFrame = requestAnimationFrame(animate);
    };

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();

      const xRatio = ((e.clientX - rect.left) / rect.width) - 0.5;
      const yRatio = ((e.clientY - rect.top) / rect.height) - 0.5;

      targetX = xRatio * 6;
      targetY = yRatio * -4;

      if (!animFrame) animate();
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;

      setTimeout(() => {
        cancelAnimationFrame(animFrame);
        animFrame = null;

        grid.style.transform =
          'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      }, 600);
    });
  }

    
  }, [])


// Login Logic


  const handleLogin = () => {
    const validUser = users?.find(
      (u) => u.username === username && u.password === password
    )

    if (validUser) {
      document.cookie = "user=true"
      location.reload()
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    document.cookie = "user=false"
    location.reload()
  }

  const categories = ['all', ...new Set(items.map(item => item.category))]

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)

  //  Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (mapping === 'price_first') return a.price - b.price
    return (b.attributes?.rating || 0) - (a.attributes?.rating || 0)
  })



  

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-600'}>
        ★
      </span>
    ))
  }

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a192f] min-h-screen text-white">

      {/*  HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-700 shadow-[0_16px_40px_rgba(29,130,196,0.34)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-4 gap-3">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 text-green-400 hover:scale-110 transition" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M5 8h14l-1 12H6L5 8zm4-4a3 3 0 016 0"/>
            </svg>
            <span className="text-lg font-semibold">My Catalog</span>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap items-center gap-2 justify-center">

            <input
              className="w-full sm:w-[200px] md:w-[250px] px-4 py-2 rounded-full bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-blue-500"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={mapping}
              onChange={(e) => {
                setMapping(e.target.value)
                localStorage.setItem('mapping', e.target.value)

  document.getElementById('Prodictid')?.scrollIntoView({
      behavior: 'smooth'
    })

                
              }}
              className="px-4 py-2 rounded-full bg-slate-800 border border-slate-600"
            >
              <option value="price_first">Price First</option>
              <option value="specs_first">Specs First</option>
            </select>

            {/* VIEW TOGGLE */}
            <div className="flex bg-slate-800 rounded-full p-1">
              <button
                onClick={() => {
  setView('grid');
  document.getElementById('Prodictid')?.scrollIntoView({ behavior: 'smooth' });
}}
                className={`p-2 rounded-full ${view === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </button>

              <button
                onClick={() => {
  setView('list');
  document.getElementById('Prodictid')?.scrollIntoView({ behavior: 'smooth' });
}}
                className={`p-2 rounded-full ${view === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
              >
                ☰
              </button>
            </div>

            

            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-full">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-green-500 px-4 py-2 rounded-full">
                Login
              </button>
            )}

          </div>
        </div>
      </div>

{/*hero sections */ }


{/* ================= HERO ================= */}
<section id="hero" className="relative w-full max-w-7xl mx-auto px-5 lg:px-10 pt-12 pb-16 overflow-hidden" style={{marginTop: '2%', marginBottom: '4%'}}>

  {/* Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="glow-1 absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full blur-3xl"></div>
    <div className="glow-2 absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full blur-3xl"></div>
  </div>

  <div className="flex flex-col lg:flex-row items-center gap-10">

    {/* LEFT */}
    <div className="lg:w-[45%] flex flex-col gap-6">

      <div className="reveal-left d1 badge-pulse px-3 py-1 border rounded-full text-xs tag">
        New Season 2026
      </div>

      <h1 className="tag2 reveal-left d2 text-4xl font-bold ">
        Everything <br />
        You <span className="text-shimmer">Need</span><br />
        All in One.
      </h1>

      <p className="reveal-left d3 text-slate-400">
        
        Explore our curated catalog of premium electronics, footwear, clothing, and accessories designed.
      </p>

      

      <div className="reveal-left d5 flex gap-3">
      

        <button
  onClick={() => {
    document.getElementById('Prodictid')?.scrollIntoView({ behavior: 'smooth' })
  }}
  className="text-shimmer item-card2 bg-white text-black px-6 py-3 rounded shadow-custom"
>
  Shop All →
</button>
        
      </div>

    </div>

    {/* RIGHT GRID */}
    <div id="parallax-wrapper" className="lg:w-[55%] h-[500px]">

      <div id="parallax-grid" className="grid grid-cols-12 grid-rows-12 gap-3 h-full">

        <div className="col-span-6 row-span-7 reveal-up d2 float-a">
       
<img src="\Images\hero-img1.png" className="cat-card w-full h-full object-cover rounded-xl"/>
      </div>

        <div className="col-span-6 row-span-5 reveal-up d3 float-b">
          <img src="\Iimages\hero-img2.png" className="cat-card w-full h-full object-cover rounded-xl"/>
        </div>

        <div className="col-span-3 row-span-4 reveal-up d4 float-c">
          <img src="\Images\hero-img3.png" className="cat-card w-full h-full object-cover rounded-xl"/>
        </div>

        <div className="col-span-3 row-span-4 reveal-up d5 float-a">
          <img src="\Images\hero-img4.png" className="cat-card w-full h-full object-cover rounded-xl"/>
        </div>

        <div className="col-span-6 row-span-5 reveal-up d6 float-b">
          <img src="\Images\hero-img5.png" className="cat-card w-full h-full object-cover rounded-xl"/>
        </div>
{/* ===== FLOATING STAT CHIP ===== */}
<div className=" item-card1 col-span-3 row-span-3 col-start-7 row-start-10 reveal-up d5 z-30 flex items-center justify-center">
  <div className="w-full h-full rounded-large  flex flex-col items-center justify-center shadow-custom bg-[var(--color-surface-alt)] border-[var(--color-border)]">
    <span className="text-2xl font-black text-[var(--color-text-primary)]">
      20+
    </span>
    <span className="text-xs font-medium text-[var(--color-text-muted)]">
      Products
    </span>
  </div>
</div>

{/* ===== FLOATING RATING CHIP ===== */}
<div className="item-card1 col-span-3 row-span-3 col-start-10 row-start-10 reveal-up d6 z-30 flex items-center justify-center ">
  <div className="w-full h-full rounded-large  flex flex-col items-center justify-center shadow-custom bg-[var(--color-surface-alt)] border-[var(--color-border)]">
    <span className="text-2xl font-black text-[var(--color-accent-amber)]">
      4.9
    </span>
    <span className="text-xs font-medium text-[var(--color-text-muted)]">
      Rating
    </span>
  </div>
</div>
      </div>
    </div>

  </div>
</section>

<div id="Prodictid">

      {/* 🔥 TITLE */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-6">
        <h1 className="text-3xl font-bold">
          {selectedCategory === 'all'
            ? 'All Products'
            : `${selectedCategory} Products`}
        </h1>
        <p className="text-slate-400 mt-1">
          {sortedItems.length} products found
        </p>
      </div>

      {/* 🧭 CATEGORY */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
        <p className="text-xs tracking-wider text-slate-400 mb-3 font-semibold">
          CATEGORIES
        </p>

        <div className="flex gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🛒 PRODUCTS */}
      <div className="px-4 md:px-10 py-6 max-w-7xl mx-auto">

        <div className={`${
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }`}>

          {sortedItems.map(item => (
            <div
              key={item._id}
              className={`bg-slate-800/70 backdrop-blur-md rounded-2xl p-4 
              shadow-[0px_0px_56px_-8px_rgba(57,133,172,0.54)] 
              border-b-2 border-[#732cf0]
              hover:shadow-[0px_0px_70px_-5px_rgba(57,133,172,0.8)]
              hover:-translate-y-1 transition-all duration-300
              ${view === 'list' ? 'flex gap-4 items-center' : ''}`}
            >

              {item.image && (
                <img
                  src={urlFor(item.image).width(400).url()}
                  className={`${view === 'list' ? 'w-32 h-32' : 'w-full h-48 mb-3'} object-cover rounded-xl`}
                />
              )}

              <div className="flex-1">

                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.category}</p>

                <div className="flex items-center mt-1">
                  {renderStars(Math.round(item?.attributes?.rating || 0))}
                  <span className="ml-2 text-sm text-slate-400">
                    {item?.attributes?.rating}
                  </span>
                </div>

                {/* 🔥 PRICE / SPECS LOGIC */}
                {mapping === 'price_first' ? (
                  <>
                    <p className="text-green-400 font-bold text-lg mt-2">
                      ${item.price}
                    </p>

                    <div className="text-sm mt-2 space-y-1">
                      {Object.entries(item.attributes || {}).map(([k, v]) => (
                        <div key={k}>
                          <span className="font-semibold">{k}:</span> {v}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm mt-2 space-y-1">
                      {Object.entries(item.attributes || {}).map(([k, v]) => (
                        <div key={k}>
                          <span className="font-semibold">{k}:</span> {v}
                        </div>
                      ))}
                    </div>

                    <p className="text-green-400 font-bold text-lg mt-2">
                      ${item.price}
                    </p>
                  </>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>


<section
      className="w-full border-t border-b"
      style={{
        backgroundColor: "var(--color-surface-alt)",
        borderColor: "var(--color-border)",
        maxHeight: "120px",
        marginTop: "10%",
        border: "unset",
        boxShadow: "0 16px 40px rgb(29 130 196 / 34%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div className="stat-item reveal-up d1">
          <p className="font-heading font-black text-2xl" style={{ color: "var(--color-text-primary)" }}>
            10+
          </p>
          <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Happy Customers
          </p>
        </div>

        <div className="stat-item reveal-up d2">
          <p className="font-heading font-black text-2xl" style={{ color: "var(--color-text-primary)" }}>
            20+
          </p>
          <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Premium Products
          </p>
        </div>

        <div className="stat-item reveal-up d3">
          <p className="font-heading font-black text-2xl" style={{ color: "var(--color-text-primary)" }}>
            24/7
          </p>
          <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Customer Support
          </p>
        </div>

        <div className="stat-item reveal-up d4">
          <p className="font-heading font-black text-2xl" style={{ color: "var(--color-text-primary)" }}>
            100%
          </p>
          <p className="text-xs font-medium mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Product Satisfaction
          </p>
        </div>

      </div>
    </section>


      {/*  LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl w-80 shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Login</h3>

            <input
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between">
             <button
  onClick={() => {
    handleLogin()

    document.getElementById('Prodictid')?.scrollIntoView({
      behavior: 'smooth'
    })
  }}
  className="bg-green-500 text-white px-4 py-2 rounded"
>
  Submit
</button>
              <button onClick={() => setShowLogin(false)} className="text-gray-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  )
}