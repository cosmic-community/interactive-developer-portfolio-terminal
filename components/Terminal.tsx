'use client'

import { useState, useEffect, useRef } from 'react'
import type { DeveloperProfile, Skill, Experience, Project, ContactInfo } from '@/types'

interface TerminalData {
  profile: DeveloperProfile | null
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  contactInfo: ContactInfo | null
}

interface TerminalProps {
  data: TerminalData
}

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
  timestamp?: Date
}

export default function Terminal({ data }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Alex Johnson\'s Interactive Portfolio Terminal' },
    { type: 'output', content: 'Type "help" to see available commands' },
    { type: 'output', content: '' }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands = {
    help: () => [
      'Available commands:',
      '  help      - Show this help message',
      '  clear     - Clear the terminal',
      '  profile   - Show developer profile',
      '  skills    - Display skills by category',
      '  experience- Show work experience',
      '  projects  - List portfolio projects',
      '  contact   - Display contact information',
      '  ls        - List available commands',
      '  whoami    - Display current user info',
      ''
    ],
    clear: () => {
      setLines([])
      return []
    },
    ls: () => ['profile', 'skills', 'experience', 'projects', 'contact'],
    whoami: () => [data.profile?.metadata?.full_name || 'Developer'],
    profile: () => {
      if (!data.profile) return ['Profile not found']
      const { metadata } = data.profile
      return [
        `Name: ${metadata?.full_name || 'N/A'}`,
        `Title: ${metadata?.job_title || 'N/A'}`,
        `Location: ${metadata?.location || 'N/A'}`,
        `Experience: ${metadata?.years_experience || 'N/A'} years`,
        '',
        'Bio:',
        metadata?.bio || 'No bio available',
        ''
      ]
    },
    skills: () => {
      if (!data.skills.length) return ['No skills found']
      
      // Group skills by category
      const skillsByCategory = data.skills.reduce((acc, skill) => {
        const categoryKey = skill.metadata?.category?.key || 'other'
        const categoryName = skill.metadata?.category?.value || 'Other'
        
        if (!acc[categoryKey]) {
          acc[categoryKey] = {
            name: categoryName,
            skills: []
          }
        }
        
        acc[categoryKey].skills.push({
          name: skill.metadata?.skill_name || skill.title,
          level: skill.metadata?.proficiency_level?.value || 'N/A'
        })
        
        return acc
      }, {} as Record<string, { name: string; skills: { name: string; level: string }[] }>)

      const result = ['Skills by Category:', '']
      
      Object.entries(skillsByCategory).forEach(([key, category]) => {
        result.push(`${category.name}:`)
        category.skills.forEach(skill => {
          result.push(`  • ${skill.name} (${skill.level})`)
        })
        result.push('')
      })
      
      return result
    },
    experience: () => {
      if (!data.experience.length) return ['No experience found']
      
      const result = ['Work Experience:', '']
      
      data.experience.forEach((exp, index) => {
        const { metadata } = exp
        const startDate = metadata?.start_date ? new Date(metadata.start_date).toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        }) : 'N/A'
        
        const endDate = metadata?.current_job ? 'Present' : 
          metadata?.end_date ? new Date(metadata.end_date).toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          }) : 'N/A'
        
        result.push(`${index + 1}. ${metadata?.job_title || 'N/A'} at ${metadata?.company_name || 'N/A'}`)
        result.push(`   ${startDate} - ${endDate} | ${metadata?.location || 'N/A'}`)
        
        if (metadata?.job_description) {
          result.push(`   ${metadata.job_description}`)
        }
        
        if (metadata?.achievements) {
          result.push('   Key Achievements:')
          metadata.achievements.split('\n').forEach(achievement => {
            if (achievement.trim()) {
              result.push(`   ${achievement.trim()}`)
            }
          })
        }
        
        result.push('')
      })
      
      return result
    },
    projects: () => {
      if (!data.projects.length) return ['No projects found']
      
      const result = ['Portfolio Projects:', '']
      
      data.projects.forEach((project, index) => {
        const { metadata } = project
        result.push(`${index + 1}. ${metadata?.project_name || project.title}`)
        
        if (metadata?.description) {
          result.push(`   Description: ${metadata.description}`)
        }
        
        if (metadata?.tech_stack) {
          result.push(`   Tech Stack: ${metadata.tech_stack}`)
        }
        
        if (metadata?.project_type?.value) {
          result.push(`   Type: ${metadata.project_type.value}`)
        }
        
        if (metadata?.status?.value) {
          result.push(`   Status: ${metadata.status.value}`)
        }
        
        if (metadata?.live_url) {
          result.push(`   Live URL: ${metadata.live_url}`)
        }
        
        if (metadata?.github_url) {
          result.push(`   GitHub: ${metadata.github_url}`)
        }
        
        result.push('')
      })
      
      return result
    },
    contact: () => {
      if (!data.contactInfo) return ['Contact information not found']
      
      const { metadata } = data.contactInfo
      const result = ['Contact Information:', '']
      
      if (metadata?.email) {
        result.push(`Email: ${metadata.email}`)
      }
      
      if (metadata?.phone) {
        result.push(`Phone: ${metadata.phone}`)
      }
      
      if (metadata?.linkedin_url) {
        result.push(`LinkedIn: ${metadata.linkedin_url}`)
      }
      
      if (metadata?.github_url) {
        result.push(`GitHub: ${metadata.github_url}`)
      }
      
      if (metadata?.twitter_url) {
        result.push(`Twitter: ${metadata.twitter_url}`)
      }
      
      if (metadata?.website_url) {
        result.push(`Website: ${metadata.website_url}`)
      }
      
      const availability = metadata?.available_for_work ? 'Available for work' : 'Not currently seeking new opportunities'
      result.push(`Status: ${availability}`)
      
      return result
    }
  }

  // Handle command execution
  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    
    // Add input to history
    setCommandHistory(prev => [...prev, input])
    setHistoryIndex(-1)
    
    // Add command to terminal
    setLines(prev => [...prev, { type: 'input', content: `$ ${input}` }])
    
    if (!trimmedInput) return
    
    // Execute command
    if (commands[trimmedInput as keyof typeof commands]) {
      const output = commands[trimmedInput as keyof typeof commands]()
      if (Array.isArray(output)) {
        setLines(prev => [...prev, ...output.map(line => ({ type: 'output' as const, content: line }))])
      }
    } else {
      setLines(prev => [...prev, { type: 'error', content: `Command not found: ${trimmedInput}. Type "help" for available commands.` }])
    }
  }

  // Handle input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex] || '')
        }
      }
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-terminal-bg rounded-lg shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-300 text-sm ml-4 font-mono">
              terminal — portfolio@alexjohnson.dev
            </span>
          </div>
          
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="p-4 h-96 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Output */}
            <div className="font-mono text-sm">
              {lines.map((line, index) => (
                <div key={index} className={`mb-1 ${
                  line.type === 'input' ? 'text-terminal-prompt' : 
                  line.type === 'error' ? 'text-red-400' : 'text-terminal-text'
                }`}>
                  <span className="terminal-output">{line.content}</span>
                </div>
              ))}
              
              {/* Current Input Line */}
              <div className="flex items-center text-terminal-text">
                <span className="text-terminal-prompt mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none font-mono caret-purple-400"
                  placeholder="Type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="terminal-cursor"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal Instructions */}
        <div className="mt-6 text-center text-slate-400">
          <p className="text-sm">
            Click in the terminal and try commands like: <code className="bg-slate-800 px-2 py-1 rounded">profile</code>, <code className="bg-slate-800 px-2 py-1 rounded">skills</code>, <code className="bg-slate-800 px-2 py-1 rounded">projects</code>, or <code className="bg-slate-800 px-2 py-1 rounded">help</code>
          </p>
        </div>
      </div>
    </section>
  )
}