import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

export async function getDeveloperProfile() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'developer-profile'
    }).depth(1)
    return response.object
  } catch (error) {
    console.error('Error fetching developer profile:', error)
    return null
  }
}

export async function getSkills() {
  try {
    const response = await cosmic.objects.find({
      type: 'skills'
    }).depth(1)
    return response.objects
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function getExperience() {
  try {
    const response = await cosmic.objects.find({
      type: 'experience'
    }).depth(1)
    
    // Sort by start date (newest first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime()
      const dateB = new Date(b.metadata?.start_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error fetching experience:', error)
    return []
  }
}

export async function getProjects() {
  try {
    const response = await cosmic.objects.find({
      type: 'projects'
    }).depth(1)
    return response.objects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getContactInfo() {
  try {
    const response = await cosmic.objects.findOne({
      type: 'contact-info'
    }).depth(1)
    return response.object
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}