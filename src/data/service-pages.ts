export interface ServicePageFaq {
	question: string
	answer: string
}

export interface ServicePageStep {
	title: string
	description: string
}

export interface ServicePageLink {
	label: string
	href: string
	description?: string
}

export interface ServicePageData {
	slug: string
	icon: string
	title: string
	shortTitle: string
	heroImageSrc: string
	heroImageAlt: string
	metaTitle: string
	metaDescription: string
	primaryKeyword: string
	secondaryKeywords: string[]
	heroEyebrow: string
	heroHeadline: string
	heroSubheadline: string
	heroSecondaryCta: string
	problemHeadline: string
	problemCopy: string
	problemCards: string[]
	helpsHeadline: string
	helpsItems: string[]
	includedHeadline: string
	includedItems: string[]
	practicalHeadline: string
	practicalCopy: string
	localHeadline: string
	localCopy: string
	processSteps: ServicePageStep[]
	relatedServices: string[]
	relevantPosts: ServicePageLink[]
	faq: ServicePageFaq[]
	finalCtaHeadline: string
	finalCtaCopy: string
}

const sharedFaq: ServicePageFaq = {
	question: 'Do you work with businesses outside the Triangle?',
	answer:
		'Yes. Mike the Tech Ninja can work remotely with small businesses anywhere, but the focus is on helping Raleigh, Cary, Durham, Chapel Hill, Apex, and Triangle-area businesses because local context can make the work more useful.',
}

export const blogLinks: ServicePageLink[] = [
	{
		label: '7 Must-Have Elements for a High-Converting Small Business Website',
		href: '/blog/small-business-website-checklist/',
		description: 'A practical checklist for clearer messaging, better trust, and stronger website conversion.',
	},
	{
		label: 'Why Your Website Should Not Be Just an Online Brochure',
		href: '/blog/why-your-website-should-not-be-just-an-online-brochure/',
		description: 'How to make a website explain the offer, build trust, and create a next step.',
	},
	{
		label: 'The Small Business Homepage Checklist: What to Fix First',
		href: '/blog/the-small-business-homepage-checklist-what-to-fix-first/',
		description: 'A simple way to review clarity, trust, follow-up, and conversion before redesigning.',
	},
]

export const servicePages: ServicePageData[] = [
	{
		slug: 'websites-landing-pages',
		icon: 'laptop',
		title: 'Small business websites and landing pages built to turn visitors into leads.',
		shortTitle: 'Websites & Landing Pages',
		heroImageSrc: '/services-websites.webp',
		heroImageAlt:
			'Small business website design and landing page mockup with mobile view, trust signals, form, and conversion-focused layout',
		metaTitle: 'Small Business Website Design in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Mike the Tech Ninja builds practical websites and landing pages for Triangle small businesses that need clearer messaging, better trust, and more leads.',
		primaryKeyword: 'small business website design Raleigh NC',
		secondaryKeywords: [
			'small business web design Triangle NC',
			'website designer Cary NC',
			'landing page design Raleigh NC',
			'WordPress developer Raleigh NC',
			'Shopify website help Raleigh NC',
			'small business landing pages',
		],
		heroEyebrow: 'Websites & Landing Pages for Triangle Small Businesses',
		heroHeadline: 'Small business websites that explain, build trust, and convert.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle build websites and landing pages that do more than look good. They help customers understand your offer, trust your business, and take the next step.',
		heroSecondaryCta: 'See What a Better Website Should Include',
		problemHeadline: 'Your website may be costing you leads before you ever talk to them.',
		problemCopy:
			'Many small business websites are outdated, unclear, slow, hard to use on mobile, or too focused on describing the business instead of helping customers decide. That creates wasted ad spend, weaker local SEO, and missed referrals.',
		problemCards: [
			'Unclear messaging',
			'Weak calls to action',
			'Outdated design',
			'Poor mobile experience',
			'Slow page speed',
			'No tracking or lead follow-up',
		],
		helpsHeadline: 'A better website should make the next step obvious.',
		helpsItems: [
			'Clarify what you do and who you help',
			'Build trust with real proof and clear information',
			'Improve mobile experience and page speed',
			'Support paid ads, SEO, referrals, and social traffic',
			'Capture better leads through stronger forms and CTAs',
			'Track what is actually working',
		],
		includedHeadline: 'Website and landing page support built around your actual business goals.',
		includedItems: [
			'Small business website builds',
			'Landing pages for paid campaigns',
			'Homepage and service page improvements',
			'WordPress, Shopify, and custom site support',
			'React / Next.js builds where needed',
			'Mobile and speed improvements',
			'Lead forms and booking integrations',
			'Analytics, tracking, and conversion setup',
			'Local SEO-ready page structure',
		],
		practicalHeadline: 'No bloated website project. No redesign for the sake of redesigning.',
		practicalCopy:
			'The goal is not to sell a huge website project by default. Sometimes the right move is a better landing page, a clearer homepage, a conversion cleanup, or a focused service page that helps people decide faster.',
		localHeadline: 'Built for local businesses that need to win trust quickly.',
		localCopy:
			'Triangle customers often compare multiple local providers before calling. A website should support that decision with clear service information, local proof, and easy contact paths so your business feels trustworthy before the first conversation.',
		processSteps: [
			{title: 'Diagnose', description: 'Review the current site, traffic sources, conversion paths, and business goals.'},
			{title: 'Prioritize', description: 'Identify the pages and fixes most likely to improve trust, clarity, and leads.'},
			{title: 'Build', description: 'Create or improve the website, landing page, forms, tracking, and content.'},
			{title: 'Improve', description: 'Review what is working and identify the next practical improvement.'},
		],
		relatedServices: ['paid-media-seo', 'cro-digital-strategy', 'lifecycle-email-marketing'],
		relevantPosts: [blogLinks[0], blogLinks[1], blogLinks[2]],
		faq: [
			{
				question: 'Do I need a full website redesign?',
				answer:
					'Not always. Some businesses need a full rebuild, but many need a clearer homepage, better landing page, stronger service content, improved forms, or tracking cleanup first.',
			},
			{
				question: 'Can you build landing pages for paid ads?',
				answer:
					'Yes. Landing pages are especially useful when you are paying for traffic and need one focused page built around one offer and one next step.',
			},
			{
				question: 'Do you work with WordPress and Shopify?',
				answer:
					'Yes. Mike the Tech Ninja can help with WordPress, Shopify, and custom website builds depending on what your business actually needs.',
			},
			{
				question: 'Can you help with copy too?',
				answer: 'Yes. Website performance often starts with clearer messaging, not just design or development.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Not sure what your website needs first?',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you identify whether your best next move is a redesign, landing page, homepage cleanup, tracking fix, or conversion improvement.',
	},
	{
		slug: 'custom-ai-automation',
		icon: 'bot',
		title: 'Practical AI and automation for small businesses that need more time back.',
		shortTitle: 'Custom AI & Automation',
		heroImageSrc: '/services-ai.webp',
		heroImageAlt:
			'Small business AI automation workflow with lead intake, chat assistant, internal knowledge, SOPs, and reporting',
		metaTitle: 'AI Consultant for Small Business in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Practical AI tools and automation for Triangle small businesses. Mike the Tech Ninja helps with AI assistants, workflows, lead intake, content systems, and internal tools.',
		primaryKeyword: 'AI consultant Raleigh NC',
		secondaryKeywords: [
			'small business AI consultant',
			'AI automation consultant Raleigh',
			'custom AI tools for small business',
			'AI chatbot for small business',
			'AI workflow automation',
			'business automation consultant Triangle NC',
		],
		heroEyebrow: 'Custom AI & Automation for Triangle Small Businesses',
		heroHeadline: 'Use AI to save time, respond faster, and make your business easier to run.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle use AI in practical ways, from customer response helpers and lead intake tools to internal knowledge assistants and content workflows.',
		heroSecondaryCta: 'Find My First AI Opportunity',
		problemHeadline: 'AI sounds useful, but most small businesses are not sure where to start.',
		problemCopy:
			'Business owners hear about AI every day, but many do not know what is practical, what is worth building, what is risky, or what would actually save time in a real workflow.',
		problemCards: [
			'Too many repeated questions',
			'Slow lead follow-up',
			'Scattered business knowledge',
			'Manual content creation',
			'Repetitive admin work',
			'No clear AI roadmap',
		],
		helpsHeadline: 'Start with the repetitive work your business already does.',
		helpsItems: [
			'Answer common customer questions faster',
			'Qualify and summarize leads',
			'Turn FAQs and service knowledge into useful tools',
			'Draft content, emails, and responses from your business knowledge',
			'Create internal assistants for processes and policies',
			'Automate simple workflows between tools',
		],
		includedHeadline: 'AI support that is practical, specific, and built around your business.',
		includedItems: [
			'AI opportunity audit',
			'Custom AI assistants',
			'Lead intake and qualification tools',
			'Customer response helpers',
			'Internal knowledge bots',
			'Content generation workflows',
			'Email and social content systems',
			'AI chatbot planning and setup',
			'Prompt systems and training',
			'Automation with tools like Make, Zapier, Airtable, Google Workspace, or custom apps',
		],
		practicalHeadline: 'AI should solve a real problem, not create another tool to manage.',
		practicalCopy:
			'Mike does not start with hype. He starts by finding repeated tasks, customer questions, workflow gaps, and knowledge bottlenecks so the first AI project is useful, realistic, and worth maintaining.',
		localHeadline: 'Local AI help for businesses that want a real conversation before they invest.',
		localCopy:
			'AI can feel abstract. For Triangle businesses, Mike can meet in person when useful, understand the real workflow, and recommend something grounded in how the business actually runs.',
		processSteps: [
			{title: 'Identify', description: 'Find the repeated tasks, questions, and workflow gaps that create the most friction.'},
			{title: 'Prioritize', description: 'Choose the AI opportunity that is useful, realistic, and worth the investment.'},
			{title: 'Build', description: 'Create the assistant, workflow, chatbot, prompt system, or automation.'},
			{title: 'Train and Improve', description: 'Review outputs, refine instructions, and make sure the system fits the business.'},
		],
		relatedServices: ['apps-digital-tools', 'lifecycle-email-marketing', 'cro-digital-strategy'],
		relevantPosts: [blogLinks[1], blogLinks[2]],
		faq: [
			{
				question: 'Do I need to be technical to use AI in my business?',
				answer:
					'No. The best AI systems for small businesses are built around practical workflows and plain-English use cases.',
			},
			{
				question: 'Should I start with an AI chatbot?',
				answer:
					'Maybe, but not always. Many businesses should first organize their FAQs, service details, lead qualification rules, and response process.',
			},
			{
				question: 'Can AI help with marketing content?',
				answer:
					'Yes. AI can help turn customer questions and business knowledge into blog posts, emails, social posts, landing page copy, and ad ideas.',
			},
			{
				question: 'Can AI replace employees?',
				answer:
					'The goal is not to replace people. The goal is to save time, improve consistency, and help your team focus on higher-value work.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Want to know where AI could actually help your business?',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you identify realistic AI opportunities that could save time, improve follow-up, or make your business easier to run.',
	},
	{
		slug: 'apps-digital-tools',
		icon: 'code',
		title: 'Custom apps and digital tools built around the way your small business works.',
		shortTitle: 'Apps & Digital Tools',
		heroImageSrc: '/services-apps.webp',
		heroImageAlt:
			'Custom small business app dashboard with workflows, tasks, forms, reporting, and connected digital tools',
		metaTitle: 'Custom App Development for Small Business in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Mike the Tech Ninja builds custom apps, internal tools, dashboards, portals, calculators, and AI-powered workflows for Triangle small businesses.',
		primaryKeyword: 'custom app development Raleigh NC',
		secondaryKeywords: [
			'small business app development',
			'custom business tools Raleigh',
			'internal tools for small business',
			'web app developer Raleigh NC',
			'business dashboard development',
			'custom software for small business',
		],
		heroEyebrow: 'Apps & Digital Tools for Triangle Small Businesses',
		heroHeadline: 'When off-the-shelf tools do not fit, build something that does.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses create practical apps, dashboards, portals, calculators, intake systems, and internal tools that solve real workflow problems without big software-company overhead.',
		heroSecondaryCta: 'Talk Through a Tool Idea',
		problemHeadline: 'Your business may be working around tools that were not built for you.',
		problemCopy:
			'Small businesses often rely on spreadsheets, manual emails, disconnected tools, repeated data entry, and systems that almost work but not quite. That usually means the workflow is carrying more friction than it should.',
		problemCards: [
			'Messy spreadsheets',
			'Disconnected tools',
			'Manual reporting',
			'Slow intake processes',
			'No customer portal',
			'Repeated data entry',
		],
		helpsHeadline: 'A good tool should remove friction, not add complexity.',
		helpsItems: [
			'Organize leads, projects, customers, or internal tasks',
			'Create custom intake and quote workflows',
			'Build customer or client portals',
			'Connect tools through APIs',
			'Create dashboards and reporting views',
			'Add AI-powered features to existing workflows',
			'Replace messy manual processes with simple systems',
		],
		includedHeadline: 'Custom digital tools that fit the actual problem.',
		includedItems: [
			'Custom web apps',
			'Internal dashboards',
			'Client or customer portals',
			'Lead intake tools',
			'Quote calculators',
			'AI-powered tools',
			'Workflow automation',
			'API integrations',
			'Data organization',
			'Admin panels',
			'Lightweight MVPs and prototypes',
		],
		practicalHeadline: 'You may not need a giant software build.',
		practicalCopy:
			'Many businesses need a focused tool, not a full SaaS product. The right solution might be a dashboard, form, portal, calculator, or automation that solves one high-value problem well.',
		localHeadline: 'Built for local businesses with real-world workflows.',
		localCopy:
			'In-person workflow discovery can be useful. Seeing how a Triangle business handles intake, scheduling, customers, or reporting often reveals what tool is actually needed and what can stay simple.',
		processSteps: [
			{title: 'Map the Workflow', description: 'Understand the current process, tools, people, and pain points.'},
			{title: 'Define the Useful Version', description: 'Decide what the tool needs to do first, without overbuilding.'},
			{title: 'Build and Connect', description: 'Create the app, dashboard, portal, automation, or integration.'},
			{title: 'Test and Improve', description: 'Use real business scenarios to refine the tool and improve usability.'},
		],
		relatedServices: ['custom-ai-automation', 'websites-landing-pages', 'cro-digital-strategy'],
		relevantPosts: [blogLinks[1], blogLinks[2]],
		faq: [
			{
				question: 'What kind of apps can you build?',
				answer:
					'Examples include internal dashboards, client portals, lead intake tools, quote calculators, admin tools, workflow systems, and AI-powered business tools.',
			},
			{
				question: 'Do I need a full software product?',
				answer:
					'Usually not. Many small businesses need a focused internal or customer-facing tool that solves one practical problem well.',
			},
			{
				question: 'Can you connect my existing tools?',
				answer:
					'Often, yes. The right solution may involve connecting tools through APIs, automations, or a lightweight dashboard.',
			},
			{
				question: 'Can you build AI into the tool?',
				answer:
					'Yes. AI can be added where it helps summarize, generate, classify, answer, or automate parts of the workflow.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Have a workflow that feels harder than it should?',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you figure out whether a custom app, dashboard, portal, or automation could make the work easier.',
	},
	{
		slug: 'paid-media-seo',
		icon: 'search',
		title: 'Paid media and SEO that help the right customers find your small business.',
		shortTitle: 'Paid Media & SEO',
		heroImageSrc: '/services-seo.webp',
		heroImageAlt:
			'Paid media and local SEO strategy showing search visibility, map results, funnel, landing pages, and analytics for a small business',
		metaTitle: 'Paid Media & SEO Consultant in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Mike the Tech Ninja helps Triangle small businesses with Google Ads, Meta ads, SEO, local search, landing pages, tracking, and smarter campaign strategy.',
		primaryKeyword: 'digital marketing consultant Raleigh NC',
		secondaryKeywords: [
			'Google Ads consultant Raleigh NC',
			'SEO consultant Raleigh NC',
			'local SEO Raleigh NC',
			'small business marketing consultant Raleigh',
			'paid media consultant Triangle NC',
			'Meta ads consultant Raleigh',
		],
		heroEyebrow: 'Paid Media & SEO for Triangle Small Businesses',
		heroHeadline: 'Get found, get clearer, and stop wasting budget on disconnected marketing.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle improve paid traffic, local SEO, landing pages, tracking, and campaign strategy so marketing dollars work harder.',
		heroSecondaryCta: 'Review My Traffic Strategy',
		problemHeadline: 'More traffic does not help if the system behind it is weak.',
		problemCopy:
			'Businesses often spend on ads or SEO without strong landing pages, tracking, local content, follow-up, or clear offers. That makes the traffic look expensive even when the deeper issue is the system behind it.',
		problemCards: [
			'Ads without landing pages',
			'SEO without service pages',
			'Traffic without tracking',
			'Clicks without leads',
			'Weak local visibility',
			'No follow-up plan',
		],
		helpsHeadline: 'A smarter traffic strategy connects search, ads, pages, and follow-up.',
		helpsItems: [
			'Improve local search visibility',
			'Launch or clean up Google Ads campaigns',
			'Build landing pages for paid traffic',
			'Create SEO content around real customer questions',
			'Set up tracking and conversion measurement',
			'Improve campaign messaging and offers',
			'Balance SEO and paid media based on budget and timeline',
		],
		includedHeadline: 'Traffic support for small businesses that need practical growth, not mystery reports.',
		includedItems: [
			'Google Ads strategy and setup',
			'Meta ads strategy and setup',
			'Local SEO audits',
			'Google Business Profile recommendations',
			'SEO page planning',
			'Keyword and content strategy',
			'Landing page recommendations',
			'Conversion tracking setup',
			'Campaign reporting and next-step recommendations',
		],
		practicalHeadline: 'Before spending more, make sure the basics are ready.',
		practicalCopy:
			'Mike often checks the landing page, offer, CTA, tracking, and follow-up before recommending higher ad spend. Better traffic strategy usually starts with better conversion readiness.',
		localHeadline: 'Local search and paid traffic for businesses competing in the Triangle.',
		localCopy:
			'City-specific search intent, service-area visibility, map pack presence, and strong service pages matter in the Triangle. The goal is not just more clicks. The goal is better local-fit leads.',
		processSteps: [
			{title: 'Audit', description: 'Review current traffic, rankings, ads, landing pages, and tracking.'},
			{title: 'Prioritize', description: 'Decide whether SEO, paid media, landing pages, or tracking needs attention first.'},
			{title: 'Launch or Improve', description: 'Build the campaign, improve the page, create content, or clean up tracking.'},
			{title: 'Measure and Adjust', description: 'Review lead quality, cost, traffic behavior, and next best moves.'},
		],
		relatedServices: ['websites-landing-pages', 'cro-digital-strategy', 'lifecycle-email-marketing'],
		relevantPosts: [blogLinks[0], blogLinks[2]],
		faq: [
			{
				question: 'Should I start with SEO or paid ads?',
				answer:
					'It depends on your timeline, budget, offer, and current website. SEO is usually a longer-term play. Paid ads can test faster, but only if the landing page and tracking are ready.',
			},
			{
				question: 'Can you help with local SEO?',
				answer:
					'Yes. Local SEO can include service pages, Google Business Profile improvements, local content, reviews strategy, and better website structure.',
			},
			{
				question: 'Why are my ads not working?',
				answer:
					'The issue may be targeting, messaging, budget, landing page quality, tracking, or follow-up. Ads rarely work well in isolation.',
			},
			{
				question: 'Do I need a landing page for ads?',
				answer:
					'Often, yes. Sending paid traffic to a generic homepage usually lowers focus and makes it harder to measure results.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Before you spend more on traffic, make sure the system is ready.',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you identify whether your best next move is SEO, paid ads, landing pages, tracking, or offer cleanup.',
	},
	{
		slug: 'lifecycle-email-marketing',
		icon: 'mail',
		title: 'Email marketing and follow-up systems for small businesses that do not want leads slipping away.',
		shortTitle: 'Lifecycle & Email Marketing',
		heroImageSrc: '/services-email.webp',
		heroImageAlt:
			'Email marketing and lifecycle automation dashboard with welcome emails, nurture sequence, promotions, review requests, and reactivation',
		metaTitle: 'Email Marketing for Small Business in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Mike the Tech Ninja helps Triangle small businesses create email marketing, lead nurture, welcome flows, reactivation campaigns, and lifecycle systems that improve follow-up.',
		primaryKeyword: 'email marketing for small business Raleigh NC',
		secondaryKeywords: [
			'lifecycle marketing consultant',
			'small business email marketing',
			'email marketing consultant Raleigh',
			'lead nurture emails',
			'customer reactivation emails',
			'Klaviyo email marketing Raleigh',
			'Mailchimp consultant Raleigh',
		],
		heroEyebrow: 'Lifecycle & Email Marketing for Triangle Small Businesses',
		heroHeadline: 'Turn more leads and past customers into future opportunities.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle create practical email systems for lead follow-up, customer nurture, promotions, reactivation, and repeat business.',
		heroSecondaryCta: 'Review My Follow-Up System',
		problemHeadline: 'Many small businesses lose leads after the first contact.',
		problemCopy:
			'Lead generation is only part of the system. Slow follow-up, no nurture, and no past-customer communication leaves revenue on the table and makes every traffic source less valuable.',
		problemCards: [
			'Leads go cold',
			'No welcome flow',
			'No quote follow-up',
			'Past customers are ignored',
			'Promotions are inconsistent',
			'Emails take too long to create',
		],
		helpsHeadline: 'Better follow-up makes every lead source more valuable.',
		helpsItems: [
			'Respond to new leads more consistently',
			'Nurture people who are not ready yet',
			'Promote offers without starting from scratch',
			'Reactivate past customers',
			'Support ecommerce repeat purchases',
			'Improve customer education before and after purchase',
			'Turn one-time buyers into longer-term relationships',
		],
		includedHeadline: 'Email and lifecycle systems built around your customer journey.',
		includedItems: [
			'Welcome flows',
			'Lead nurture sequences',
			'Quote follow-up emails',
			'Customer reactivation campaigns',
			'Promotional email campaigns',
			'Newsletter strategy',
			'Review request emails',
			'Ecommerce flows',
			'Email templates and coding',
			'Klaviyo, Mailchimp, HubSpot, or platform-specific support',
			'AI-assisted email content systems',
		],
		practicalHeadline: 'You do not need a massive email program to start.',
		practicalCopy:
			'The first useful flow may be a simple welcome sequence, follow-up after form submission, or reactivation campaign. The goal is to start where the business will feel the benefit fastest.',
		localHeadline: 'For local businesses, timing and trust matter.',
		localCopy:
			'Local buyers may compare providers, take time to decide, or return later. Email keeps the relationship warm without requiring constant manual follow-up from the owner or team.',
		processSteps: [
			{title: 'Map the Journey', description: 'Identify what happens before, during, and after a lead or customer engages.'},
			{title: 'Find the Gaps', description: 'Look for moments where follow-up is missing, slow, or inconsistent.'},
			{title: 'Build the Flow', description: 'Create the emails, templates, automations, and triggers.'},
			{title: 'Improve', description: 'Review opens, clicks, replies, conversions, and customer behavior.'},
		],
		relatedServices: ['custom-ai-automation', 'paid-media-seo', 'cro-digital-strategy'],
		relevantPosts: [blogLinks[0], blogLinks[2]],
		faq: [
			{
				question: 'Do small businesses really need email marketing?',
				answer:
					'Yes, if they have leads, customers, repeat purchases, appointments, quotes, promotions, or a sales cycle that requires follow-up.',
			},
			{
				question: 'What email platform should I use?',
				answer:
					'It depends on your business. Klaviyo, Mailchimp, HubSpot, Shopify Email, and other tools can all make sense depending on your goals and setup.',
			},
			{
				question: 'Can AI help with email marketing?',
				answer:
					'Yes. AI can help draft campaigns, personalize content, repurpose blog posts, create subject line ideas, and support a more consistent content workflow.',
			},
			{
				question: 'What is the first flow I should build?',
				answer:
					'For many businesses, the best first flow is either a new lead follow-up sequence, a welcome flow, or a past-customer reactivation campaign.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Are leads and customers slipping through the cracks?',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you identify where better email and follow-up could create more value from the traffic and leads you already have.',
	},
	{
		slug: 'cro-digital-strategy',
		icon: 'line-chart',
		title: 'Digital strategy and CRO for small businesses that need to know what to fix first.',
		shortTitle: 'CRO & Digital Strategy',
		heroImageSrc: '/services-cro.webp',
		heroImageAlt:
			'Conversion rate optimization and digital strategy dashboard showing website audit, messaging clarity, analytics, funnel review, and growth roadmap',
		metaTitle: 'Digital Strategy & CRO Consultant in Raleigh NC | Mike the Tech Ninja',
		metaDescription:
			'Mike the Tech Ninja helps Triangle small businesses find digital leaks, improve conversion, clarify offers, review funnels, and prioritize smarter marketing moves.',
		primaryKeyword: 'digital strategy consultant Raleigh NC',
		secondaryKeywords: [
			'conversion rate optimization Raleigh',
			'website audit Raleigh NC',
			'small business marketing strategy',
			'CRO consultant Raleigh',
			'small business digital audit',
			'marketing consultant Triangle NC',
		],
		heroEyebrow: 'CRO & Digital Strategy for Triangle Small Businesses',
		heroHeadline: 'Find the leaks before you spend more money.',
		heroSubheadline:
			'Mike the Tech Ninja helps small businesses in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle review websites, funnels, offers, tracking, follow-up, and marketing systems so they can prioritize the digital moves that matter most.',
		heroSecondaryCta: 'Find My Biggest Digital Leak',
		problemHeadline: 'You may not need more traffic. You may need a clearer system.',
		problemCopy:
			'Businesses often jump to ads, redesigns, or tools before diagnosing the real bottleneck. The issue may be messaging, landing pages, tracking, offer clarity, follow-up, or customer journey gaps.',
		problemCards: [
			'Unclear offer',
			'Weak conversion path',
			'Poor tracking',
			'Disconnected tools',
			'Slow follow-up',
			'No priority order',
		],
		helpsHeadline: 'A better strategy helps your budget work harder.',
		helpsItems: [
			'Identify what is blocking leads or sales',
			'Improve homepage and landing page conversion',
			'Clarify offers and calls to action',
			'Review analytics and tracking',
			'Map customer journey gaps',
			'Prioritize website, ads, SEO, email, AI, and automation work',
			'Create a practical action plan',
		],
		includedHeadline: 'Strategy that turns confusion into a prioritized plan.',
		includedItems: [
			'Website audits',
			'Homepage and landing page reviews',
			'Conversion path analysis',
			'Offer and messaging review',
			'Analytics and tracking review',
			'Funnel and customer journey mapping',
			'Lead capture and follow-up review',
			'AI and automation opportunity assessment',
			'Digital roadmap creation',
			'Growth sprint planning',
		],
		practicalHeadline: 'The right order matters.',
		practicalCopy:
			'Small businesses cannot afford to do everything at once. Good strategy helps decide whether to fix the page, offer, traffic, follow-up, tracking, content, or automation first so the budget compounds instead of getting scattered.',
		localHeadline: 'A local strategy partner who can look at the real business, not just the website.',
		localCopy:
			'Conversion issues often come from the real customer experience, not just the page. Local context matters, especially when service expectations, reputation, and follow-up affect whether a visitor becomes a customer.',
		processSteps: [
			{title: 'Review', description: 'Look at the current website, marketing, traffic, tracking, offers, and follow-up.'},
			{title: 'Diagnose', description: 'Identify the biggest bottlenecks and missed opportunities.'},
			{title: 'Prioritize', description: 'Create a clear order of operations based on budget and likely impact.'},
			{title: 'Execute or Support', description: 'Help implement the fixes directly or guide the next steps.'},
		],
		relatedServices: ['websites-landing-pages', 'paid-media-seo', 'custom-ai-automation', 'lifecycle-email-marketing'],
		relevantPosts: [blogLinks[0], blogLinks[1], blogLinks[2]],
		faq: [
			{
				question: 'What is CRO?',
				answer:
					'CRO stands for conversion rate optimization. For small businesses, it means improving the parts of your website and funnel that help visitors become leads, customers, or booked appointments.',
			},
			{
				question: 'What is included in a digital strategy audit?',
				answer:
					'A strategy audit can review messaging, website structure, landing pages, traffic sources, tracking, lead capture, follow-up, SEO, paid media, and AI opportunities.',
			},
			{
				question: 'What if I do not know what the problem is?',
				answer:
					'That is exactly when strategy helps. The goal is to identify what to fix first instead of guessing or spending money in the wrong order.',
			},
			{
				question: 'Can you help implement the recommendations?',
				answer:
					'Yes. Mike the Tech Ninja can help with strategy only, hands-on implementation, or a focused Growth Sprint.',
			},
			sharedFaq,
		],
		finalCtaHeadline: 'Not sure what to fix first?',
		finalCtaCopy:
			'Book a Free Digital Gut Check and I will help you find the digital bottlenecks, prioritize the next move, and make your budget work harder.',
	},
]

export const servicePageBySlug = Object.fromEntries(servicePages.map((service) => [service.slug, service])) as Record<
	string,
	ServicePageData
>
