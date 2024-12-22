'use client'

import { useRef, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

function FAQPageCarousel() {
  const carouselRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const faqs = [
    {
      question: "How did the idea for ExpertEase come about?",
      answer: "I noticed students often struggle to find mentors who understand their specific needs like interview prep or project guidance. ExpertEase solves this by connecting students with the right mentors.",
    },
    {
      question: "What is ExpertEase?",
      answer: "ExpertEase is a platform designed to connect students with mentors who match their exact needs. Whether you're looking for career advice, mock interviews, project assistance, or even daily tracking, ExpertEase is here to make mentorship accessible, flexible, and student-centered.",
    },
    {
      question: "Who can become a mentor on ExpertEase?",
      answer: "Anyone with expertise in a particular area, like coding, design, app development, or career building, can register as a mentor. Students who are skilled in specific fields can also become mentors, making it a platform for students helping students while earning in the process.",
    },
    {
      question: "How does ExpertEase work?",
      answer: "Students seeking mentorship can search for mentors based on their specific needs and connect with them on-demand. Similarly, mentors can list their skills and availability, making it easy for students to find and book sessions. It's like Fiverr, but exclusively focused on mentorship.",
    },
    {
      question: "What makes ExpertEase different from other mentorship programs?",
      answer: "Unlike traditional mentorship programs that are often rigid or generalized, ExpertEase is flexible and tailored. It's built for students by students, ensuring a focus on specific needs, affordability, and the ability to find guidance on-demand. It's mentorship reimagined for the modern student.",
    }
  ]

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const handleWheel = (e) => {
        e.preventDefault()
        carousel.scrollLeft += e.deltaY
      }
      carousel.addEventListener('wheel', handleWheel, { passive: false })

      return () => {
        carousel.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden mt-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2D9B9B] opacity-30 rounded-full filter blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B6B] opacity-30 rounded-full filter blur-[80px]" />

      <div className="mx-auto max-w-7xl px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#2D9B9B] to-[#FF6B6B] text-transparent bg-clip-text">
            What can we help you with?
          </h1>
          <p className="text-gray-400 mb-8">Browse through our frequently asked questions</p>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide transition-all"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`flex-none w-[300px] border-none transition-all duration-300 snap-center ${
                  hoveredIndex === index ? 'scale-105 z-10' : ''
                }`}
                style={{
                  height: hoveredIndex === index ? 'auto' : '300px',
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="p-6 border-b border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2D9B9B] to-[#FF6B6B] flex items-center justify-center text-white font-medium shadow-lg">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className={`text-gray-400 ${hoveredIndex === index ? '' : 'line-clamp-4'}`}>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full h-10 w-10 bg-[rgba(255,255,255,0.05)] backdrop-blur-md hover:bg-[rgba(255,255,255,0.1)] border-[0.5px] border-[rgba(255,255,255,0.1)]"
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full h-10 w-10 bg-[rgba(255,255,255,0.05)] backdrop-blur-md hover:bg-[rgba(255,255,255,0.1)] border-[0.5px] border-[rgba(255,255,255,0.1)]"
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        
      </div>
    </div>
  )
}

export default FAQPageCarousel
