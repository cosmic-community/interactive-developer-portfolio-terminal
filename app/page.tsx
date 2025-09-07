import { getDeveloperProfile, getSkills, getExperience, getProjects, getContactInfo } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import Terminal from '@/components/Terminal'
import type { DeveloperProfile, Skill, Experience, Project, ContactInfo } from '@/types'

export default async function Home() {
  // Fetch all data in parallel
  const [profile, skills, experience, projects, contactInfo] = await Promise.all([
    getDeveloperProfile(),
    getSkills(),
    getExperience(), 
    getProjects(),
    getContactInfo(),
  ])

  // Prepare terminal data
  const terminalData = {
    profile: profile as DeveloperProfile | null,
    skills: skills as Skill[],
    experience: experience as Experience[],
    projects: projects as Project[],
    contactInfo: contactInfo as ContactInfo | null,
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection profile={profile as DeveloperProfile | null} />
      <Terminal data={terminalData} />
    </main>
  )
}