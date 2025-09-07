import type { DeveloperProfile } from '@/types'

interface HeroSectionProps {
  profile: DeveloperProfile | null
}

export default function HeroSection({ profile }: HeroSectionProps) {
  if (!profile) {
    return null
  }

  const { metadata } = profile

  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {metadata?.profile_image && (
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-purple-500/30 shadow-2xl">
                  <img
                    src={`${metadata.profile_image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={metadata.full_name || 'Developer Profile'}
                    width="192"
                    height="192"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-lg animate-pulse -z-10"></div>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  {metadata?.full_name || 'Developer'}
                </h1>
                <h2 className="text-xl lg:text-2xl text-purple-300 font-medium">
                  {metadata?.job_title || 'Full Stack Developer'}
                </h2>
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-slate-300">
                  {metadata?.location && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{metadata.location}</span>
                    </div>
                  )}
                  {metadata?.years_experience && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{metadata.years_experience}+ years experience</span>
                    </div>
                  )}
                </div>
              </div>

              {metadata?.bio && (
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {metadata.bio}
                </p>
              )}

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-bg rounded-lg text-terminal-text font-mono text-sm">
                  <span className="text-terminal-prompt">$</span>
                  <span>Use the terminal below to explore my portfolio</span>
                  <div className="terminal-cursor"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}