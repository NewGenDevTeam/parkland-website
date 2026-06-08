
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$doc.PageSetup.TopMargin = 72
$doc.PageSetup.BottomMargin = 72
$doc.PageSetup.LeftMargin = 72
$doc.PageSetup.RightMargin = 72
$sel = $word.Selection

function H1($text) { $sel.Style = "Heading 1"; $sel.TypeText($text); $sel.TypeParagraph() }
function H2($text) { $sel.Style = "Heading 2"; $sel.TypeText($text); $sel.TypeParagraph() }
function Para($text) { $sel.Style = "Normal"; $sel.TypeText($text); $sel.TypeParagraph() }
function Bullet($text) { $sel.Style = "List Bullet"; $sel.TypeText($text); $sel.TypeParagraph() }
function Num($text) { $sel.Style = "List Number"; $sel.TypeText($text); $sel.TypeParagraph() }
function Blank() { $sel.Style = "Normal"; $sel.TypeParagraph() }
function Quote($text) { $sel.Style = "Quote"; $sel.TypeText($text); $sel.TypeParagraph() }

function MakeTable($headers, $rows, $headerBg) {
    $t = $doc.Tables.Add($sel.Range, $rows.Count + 1, $headers.Count)
    $t.Style = "Table Grid"
    for ($c=0; $c -lt $headers.Count; $c++) { $t.Cell(1,$c+1).Range.Text = $headers[$c] }
    $t.Rows(1).Range.Bold = $true
    $t.Rows(1).Shading.BackgroundPatternColor = $headerBg
    $t.Rows(1).Range.Font.Color = 16777215
    for ($i=0; $i -lt $rows.Count; $i++) {
        for ($c=0; $c -lt $rows[$i].Count; $c++) { $t.Cell($i+2,$c+1).Range.Text = $rows[$i][$c] }
        if ($i % 2 -eq 0) { $t.Rows($i+2).Shading.BackgroundPatternColor = 0xF2F2F2 }
    }
    $sel.MoveDown(5, $rows.Count + 2)
    $sel.TypeParagraph()
    return $t
}

# ===== COVER =====
$sel.Style = "Title"; $sel.TypeText("Parkland By The River"); $sel.TypeParagraph()
$sel.Style = "Subtitle"; $sel.TypeText("@ Permas Jaya, Johor Bahru -- Full Content Summary"); $sel.TypeParagraph()
$sel.Style = "Normal"
$sel.TypeText("Developer: Parkland Group / Parkland Southern Sdn. Bhd."); $sel.TypeParagraph()
$sel.TypeText("Website: parklandbytheriver.com.my"); $sel.TypeParagraph()
$sel.TypeText("Content Extracted: 21 May 2026  |  Document Prepared: June 2026"); $sel.TypeParagraph()
Blank

# ===== 1. PROJECT OVERVIEW =====
H1 "1. Project Overview"
Para "Parkland By The River @ Permas Jaya is a new freehold serviced apartment development by Parkland Group, strategically located in the heart of Permas Jaya, Johor Bahru. It is positioned as a premium riverside residential community that merges modern luxury design with the tranquility of nature -- offering residents scenic river views, world-class lifestyle facilities, and unmatched connectivity to Singapore via the CIQ Complex and the upcoming RTS Link."
Blank
Para "The project was announced under Phase 2, comprising 1,078 units spread across 4 towers, each standing 36 floors tall. The total project across all phases spans 2,156 units on a 10.04-acre freehold land parcel in one of Johor Bahru's most established and well-connected neighbourhoods. With an estimated completion date of 2028, the project targets local Malaysian buyers -- including Singapore-based Malaysians seeking a well-connected home in Johor Bahru."
Blank
Quote "Experience Riverside Living Like Never Before"
Quote "A Luxurious Serviced Apartment with Modern Design and Unparalleled Convenience."
Quote "A community that resonates with value and natural energy"
Blank

# ===== 2. KEY PROJECT FACTS =====
H1 "2. Key Project Facts"
Blank
$h = @("Detail","Value")
$r = @(
    @("Property Type","Serviced Apartment / Service Residence"),
    @("Land Title","Commercial title, protected under the Housing Development Act (HDA)"),
    @("Tenure","Freehold -- permanent ownership with no expiry"),
    @("Developer","Parkland Group / Parkland Southern Sdn. Bhd."),
    @("Project Name","Parkland By The River @ Permas Jaya"),
    @("Location","Permas Jaya, Johor Bahru, Johor, Malaysia"),
    @("Total Units (Phase 2)","1,078 units"),
    @("Total Units (All Phases)","2,156 units"),
    @("Number of Towers","4 towers"),
    @("Floors Per Tower","36 floors"),
    @("Units Per Floor","18 units"),
    @("Lifts Per Tower","5 passenger lifts + 1 emergency lift"),
    @("Land Area","10.04 acres"),
    @("Price Per Sqft","Approximately RM650 per sqft"),
    @("Estimated Completion","2028"),
    @("Eligible Buyers","Locals only -- foreigners are not permitted to purchase"),
    @("Utility Rate Note","Higher than residential due to commercial land title"),
    @("APDL Number","Not found on website -- to be confirmed with developer")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 3. UNIT TYPES =====
H1 "3. Unit Types & Specifications"
Para "Parkland By The River offers three unit configurations to accommodate different household needs -- from singles and young couples to growing families. Each unit type is branded with a name that reflects the lifestyle it supports."
Blank

H2 "Type A -- The Essential Suite"
$h = @("Specification","Detail")
$r = @(
    @("Size","562 sqft"),
    @("Layout","1 Bedroom + 1 Bathroom"),
    @("Starting Price","From RM360,000"),
    @("Price Per Sqft","~RM640 / sqft"),
    @("Target Resident","Singles or young couples seeking a calm, comfortable riverside lifestyle"),
    @("Interior Renders Available","Bathroom, Bedroom x2, Dining Area, Dining+Kitchen, Dining+Living, Kitchen, Living Room x2 (9 renders total)"),
    @("Floor Plan","Official floor plan + alternative version -- both downloaded as assets")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Type B -- The Comfort Haven"
$r = @(
    @("Size","820 sqft"),
    @("Layout","2 Bedrooms + 2 Bathrooms"),
    @("Starting Price","From RM520,000"),
    @("Price Per Sqft","~RM634 / sqft"),
    @("Target Resident","Couples planning to start a family or homeowners upgrading from a smaller unit"),
    @("Interior Renders Available","Bathroom x2, Bedroom, Kitchen x2, Living Room + 9 dated interior photos Oct-Nov 2024 (15 files total)"),
    @("Floor Plan","Official floor plan + alternative version -- both downloaded as assets")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Type C -- The Family Retreat"
$r = @(
    @("Size","1,020 sqft"),
    @("Layout","3 Bedrooms + 2 Bathrooms"),
    @("Starting Price","From RM630,000"),
    @("Price Per Sqft","~RM618 / sqft"),
    @("Target Resident","Families looking for a spacious and comfortable home environment"),
    @("Interior Renders Available","Bathroom, Bedroom + 4 dated interior photos Nov 2024 (6 files total)"),
    @("Floor Plan","Official floor plan + alternative version -- both downloaded as assets")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Pricing Overview (Third-Party Data -- Verify with Developer)"
Para "Note: Prices shown on the old website were masked (e.g. RM3xxk). Figures below are from EdgeProp (August 2025) and third-party listings. Confirm official pricing with the developer before publishing on the new site."
Blank
$h = @("Unit Type","Size","Starting Price","Market Range (EdgeProp)","Most Active Price Band")
$r = @(
    @("Type A","562 sqft","From RM360,000","RM421,500 -- ~RM500,000","RM400k -- RM500k"),
    @("Type B","820 sqft","From RM520,000","~RM500,000 -- ~RM700,000","RM600k -- RM700k"),
    @("Type C","1,020 sqft","From RM630,000","Up to RM785,800","RM600k -- RM785k")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 4. SELLING POINTS =====
H1 "4. Key Selling Points & Features"
Para "The website promotes the following advantages across ownership, location, lifestyle, and practicality themes:"
Blank

H2 "Ownership & Legal Advantages"
Bullet "Freehold Title -- Permanent ownership; the land title never expires. This is a significant advantage in Johor Bahru where many new developments are sold on leasehold titles."
Bullet "Protected Under HDA -- Although the land is classified as commercial, it falls under the Housing Development Act (HDA), providing buyers with legal protection typically reserved for residential properties."
Bullet "Locals Only Purchase -- Exclusively available to Malaysian citizens. This reduces speculative foreign investment and supports a stable, community-oriented residential environment."
Blank

H2 "Location & Singapore Connectivity"
Bullet "Only 8km to CIQ & RTS Bukit Chagar -- The project's headline connectivity claim. Residents can reach the Customs, Immigration & Quarantine (CIQ) complex and the upcoming RTS Link station by short drive."
Bullet "Upcoming RTS Link (Rapid Transit System) -- When operational, the RTS Link will connect JB Sentral directly to Woodlands North MRT in Singapore, dramatically cutting commute times. This is a major future capital appreciation driver."
Bullet "5 Major Highways Within ~2km -- EDL Expressway, Tebrau Highway, Coastal Highway, Skudai Highway, and Pasir Gudang Highway. Residents have fast, multi-directional access throughout Johor and toward Singapore."
Bullet "Seamless Multi-Point Connectivity -- Strategic positioning provides access to business hubs, shopping centres, and Singapore across the causeway without navigating heavy city-centre traffic."
Blank

H2 "Lifestyle & Living Environment"
Bullet "Scenic River Views -- Units and communal areas face the river, bringing a sense of calm, openness, and natural beauty to everyday living -- a rare urban amenity in Johor Bahru."
Bullet "19 Podium Lifestyle Facilities -- A comprehensive amenity deck on the podium floor, covering aquatics, fitness, wellness, outdoor recreation, and children's play. Full facility list in Section 5."
Bullet "Wellness-Focused Community -- Branded as crafting a lifestyle for your well-being. The facility mix supports physical health, mental relaxation, family bonding, and community socialising."
Bullet "Thoughtfully Furnished -- Units come with selected fittings and furnishings. Third-party sources indicate a free semi-furnishing package potentially including air conditioning, kitchen cabinets, and a shoe cabinet. (Exact package to be confirmed.)"
Bullet "Well-Crafted Modern Interior Design -- All three unit types feature a modern elevated aesthetic with quality finishings throughout."
Blank

H2 "Practicality & Day-to-Day Convenience"
Bullet "Free Dedicated Shuttle Bus Service -- Connects residents to nearby amenities, shopping centres, and transport nodes. Particularly valuable for Singapore commuters and car-free residents."
Bullet "5 Passenger Lifts + 1 Emergency Lift Per Tower -- Well-planned lift system ensures fast, smooth access across all 36 floors with minimal waiting times."
Bullet "Completion by 2028 -- Clear timeline for buyers to plan finances, mortgage applications, and relocation."
Blank

# ===== 5. FACILITIES =====
H1 "5. Facilities -- 19 Podium Amenities"
Para "All 19 facilities are concentrated on the podium floor, creating a self-contained resort-style amenity deck above ground level. This design provides privacy, security, and an exclusive resort feel for residents. A full 3D layout map of the podium floor has been downloaded as a project asset."
Blank
Quote "Our podium floor is a sanctuary of recreation and relaxation"
Blank
$h = @("#","Facility Name","Category","Description")
$r = @(
    @("1","Multipurpose Hall","Community","Flexible event space for residents -- gatherings, meetings, functions"),
    @("2","Pantry","Community","Communal kitchen pantry supporting the multipurpose hall"),
    @("3","Changing Room","Amenity Support","Dedicated changing facilities adjacent to pool and gym areas"),
    @("4","Sauna","Wellness","Traditional sauna room for heat therapy and relaxation"),
    @("5","Hot & Cold Bath","Wellness","Therapeutic contrast bathing -- alternating hot and cold water immersion"),
    @("6","Pool Villa","Aquatics","Semi-private pool cabana or enclosed poolside relaxation pavilion"),
    @("7","Swimming Pool","Aquatics","Main resort-style pool for lap swimming and leisure"),
    @("8","Gymnasium","Fitness","Fully equipped indoor fitness centre with cardio and weight training equipment"),
    @("9","Play Pool","Aquatics / Family","Shallow recreational pool for family use and supervised children's play"),
    @("10","Pool Lounge","Aquatics","Poolside lounge seating for relaxation and socialising"),
    @("11","Water Slide","Aquatics / Family","Water slide attraction connecting to the pool area -- family-oriented feature"),
    @("12","BBQ Pit","Outdoor / Social","Barbecue stations for resident gatherings, family events, and weekend socials"),
    @("13","Pool Deck","Outdoor","Open sun deck surrounding the pool for lounging and sunbathing"),
    @("14","Serenity Garden","Wellness / Outdoor","Landscaped quiet garden for contemplation, meditation, and peaceful walks"),
    @("15","Garden Kitchen","Outdoor / Social","Outdoor al fresco cooking and dining area within the garden zone"),
    @("16","The Green Canvas","Outdoor / Recreation","Open green lawn for yoga, picnics, casual sports, or free outdoor activities"),
    @("17","Playground","Family / Children","Age-appropriate children's play structures in a safe outdoor setting"),
    @("18","Multipurpose Sports Court","Sports","Hard court adaptable for badminton, basketball, and futsal"),
    @("19","Forest Glade","Wellness / Outdoor","Nature-inspired landscaped grove or tree-lined walkway for relaxed strolls")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 6. LOCATION =====
H1 "6. Strategic Location -- All Under 10km"
Para "Permas Jaya is one of Johor Bahru's most self-sufficient and well-established townships, with a full complement of retail, education, healthcare, banking, and recreation already in place. The development's location places it within reach of every key daily need, while also being uniquely positioned for Singapore commuters."
Blank

H2 "Singapore Access -- The Headline Advantage"
$h = @("Destination","Distance","Why It Matters")
$r = @(
    @("CIQ Complex (Customs, Immigration & Quarantine)","~8 km","Main land border crossing to Singapore -- primary gateway for daily commuters"),
    @("RTS Bukit Chagar Station (upcoming)","~8 km","Future rail link to Woodlands North MRT -- a 5-minute rail connection to Singapore when operational"),
    @("RTS Link Operational Timeline","TBC (under construction)","Expected to transform JB-Singapore commuting; major property value driver for this area")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

H2 "Major Highway Access (~2km)"
Bullet "EDL Expressway (Eastern Dispersal Link) -- Fast route toward the CIQ checkpoint and Singapore"
Bullet "Tebrau Highway (Federal Route 3) -- Main artery running through JB toward Kota Tinggi and beyond"
Bullet "Coastal Highway -- Connects coastal areas from JB through Pasir Gudang"
Bullet "Skudai Highway (Federal Route 1) -- Main north-south highway toward Kuala Lumpur"
Bullet "Pasir Gudang Highway -- Access to Pasir Gudang industrial port area and eastern JB"
Para "All five major highways are within approximately 2km, making the development accessible by car from virtually any direction within Johor."
Blank

H2 "Shopping & Retail"
$h = @("Mall / Hypermarket","Distance","Details")
$r = @(
    @("AEON Mall Permas Jaya","~3 km","Major Japanese-anchored shopping mall with full retail, supermarket, F&B, and entertainment"),
    @("Lotus's Plentong","~5 km","Large format hypermarket (formerly Tesco) for groceries and general merchandise"),
    @("Giant Hypermarket Plentong","~6 km","Well-established hypermarket for fresh produce and household goods"),
    @("MidValley Southkey","~6 km","Premium lifestyle mall with international brands, cinemas, and fine dining")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Education"
$h = @("School","Distance","Type")
$r = @(
    @("SJKC Pei Hwa 2","~3 km","Chinese vernacular primary school -- popular with Chinese-speaking families"),
    @("SK Permas Jaya","~4 km","National primary school"),
    @("SMK Permas Jaya","~4 km","National secondary school"),
    @("International Schools Johor Bahru","~5 km","Multiple international school options for expat families and local students")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Healthcare"
$h = @("Hospital","Distance","Notes")
$r = @(
    @("Columbia Asia Hospital","~3 km","Private hospital widely used by expats and locals -- general and specialist care"),
    @("KPJ Pasir Gudang Specialist Hospital","~10 km","Multi-specialty private hospital -- within the under-10km threshold"),
    @("Regency Specialist Hospital","~10 km","Specialist care hospital -- also within 10km")
)
MakeTable $h $r 0x375623 | Out-Null
Blank

H2 "Banks, Recreation & Other Services"
$h = @("Category","Places","Distance")
$r = @(
    @("Banks","CIMB Bank, Maybank, Public Bank","~2.5 km each"),
    @("Golf","Permas Jaya Golf Club","~2 km"),
    @("Marina & Boating","Permas Jaya Marina Club","~3 km"),
    @("Sports Complex","Permas Jaya Sports Complex","~2.5 km"),
    @("Food & Beverage","Cafes, fast food, local and international restaurants","~2.4 km"),
    @("Entertainment","Karaoke, cinemas, bars","~3 to 5 km"),
    @("Emergency Services","Fire station, police station","~3 km each"),
    @("Government Services","Post office, courier services","~3 km")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

H2 "Shuttle Bus Service"
Para "A free dedicated shuttle bus service is provided for residents, connecting the development to nearby amenities, transport hubs, and CIQ. This is highlighted as a practical daily-life benefit -- particularly valuable for Singapore commuters who use public transport, or residents who prefer not to drive for short errands."
Blank

# ===== 7. WEBSITE STRUCTURE =====
H1 "7. Website Structure & Sections"
Para "The website is structured as a single-page scrollable site with sticky anchor navigation. Each section is a full-width scroll zone. Blog articles link out to standalone pages at /blog/[slug]."
Blank

H2 "Navigation Menu"
$h = @("#","Menu Label","Anchor / Route","Section Purpose")
$r = @(
    @("1","Home","#home","Hero -- building render, headline, stat strip, CTA, video embed"),
    @("2","Location","#location","Strategic location map and distance category cards"),
    @("3","Facilities","#facilities","19 podium lifestyle facilities with 3D map"),
    @("4","Floor Plans","#floor-plans","Unit Type A / B / C -- specs, floor plan images, interior renders"),
    @("5","Blog","#blog","Lifestyle and local insights content -- new SEO section"),
    @("6","Contact","#contact","Phone, WhatsApp, contact form, urgency CTA"),
    @("Floating","Let's Talk","WhatsApp / popup form","Always-visible floating button at all scroll positions")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

H2 "Hero Section Detail"
Bullet "Project name: PARKLAND BY THE RIVER"
Bullet "Tagline: Experience Riverside Living Like Never Before"
Bullet "Sub-tagline: A Luxurious Serviced Apartment with Modern Design and Unparalleled Convenience"
Bullet "Location badge: Permas Jaya, Johor Bahru"
Bullet "Key stat badge: 8km to CIQ & RTS"
Bullet "Quick stats strip: Freehold | 1,078 Units | 36 Floors | 19 Facilities | Est. 2028"
Bullet "Primary CTA: Let's Talk button"
Bullet "Background visuals: hero building exterior render + sky background (both assets downloaded)"
Bullet "Embedded YouTube video: Official project video (youtube.com/watch?v=_UkRgwpy0qk, starts at t=111s)"
Bullet "Blog teaser strip at base of section: 3 article preview cards (thumbnail + title + category tag)"
Blank

H2 "Contact Section Detail"
Bullet "Headline: Contact Us Today to Secure Your Unit!"
Bullet "Sub-copy: Contact With Us -- Have a Question? Call or leave your number and we will call you back"
Bullet "Main phone: 013-665 5111"
Bullet "Primary action: WhatsApp CTA button"
Bullet "Form fields: Name, Phone, Unit Type Interest, Message"
Bullet "APDL notice placeholder (pending -- to be confirmed with developer)"
Bullet "Showroom address (pending -- to be confirmed with developer)"
Blank
Quote "Units are moving fast. Register today to receive the full e-brochure and an exclusive invitation to our private gallery viewing."
Blank

H2 "Standalone Pages"
$h = @("URL","Purpose","Status")
$r = @(
    @("/blog","Blog listing page -- all articles","New content -- articles to be written"),
    @("/blog/[slug]","Individual blog article pages","New content -- articles to be written"),
    @("/brochure","Gated e-brochure download page","Pending -- client to provide PDF"),
    @("/virtual-tour","Embedded YouTube unit tour","YouTube links saved -- rights to be confirmed")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 8. BLOG STRATEGY =====
H1 "8. Blog Content Strategy (New Section)"
Para "The blog is a proposed new section absent from the original website. Its purpose is to drive organic search traffic around Permas Jaya, JB property, and Singapore commuter keywords -- supporting lead generation indirectly through informational content."
Blank

H2 "Blog Categories"
$h = @("Category","Primary Audience","SEO Goal")
$r = @(
    @("Living in Permas Jaya","Local buyers and upgraders","Rank for neighbourhood lifestyle and amenities keywords"),
    @("Singapore Commuter Guide","Singapore-based Malaysians seeking a JB home","Rank for CIQ, RTS Link, and daily commute keywords"),
    @("Homebuyer's Guide JB","First-time buyers and those new to JB property","Rank for freehold, leasehold, HDA, financing keywords"),
    @("Riverside Living","Lifestyle-focused buyers","Rank for wellness, river view, urban nature keywords"),
    @("Johor Property Market","Investors and second-home buyers","Rank for JB market outlook and investment return keywords")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

H2 "8 Suggested Launch Article Titles"
$h = @("#","Article Title","Category","Target Keyword")
$r = @(
    @("1","Why Permas Jaya Is Becoming JB's Most Sought-After Neighbourhood","Living in Permas Jaya","permas jaya property johor bahru"),
    @("2","CIQ and RTS Link Explained: What JB Residents Need to Know","Singapore Commuter Guide","CIQ RTS link JB singapore commute"),
    @("3","Freehold vs Leasehold in Malaysia: What Every First-Time Buyer Should Know","Homebuyer's Guide JB","freehold leasehold malaysia property"),
    @("4","What to Expect from Riverside Living in Johor Bahru","Riverside Living","riverside apartment johor bahru living"),
    @("5","5 Reasons Serviced Apartments in JB Are a Smart Long-Term Investment","Johor Property Market","serviced apartment johor bahru investment"),
    @("6","A Day in the Life: Living Near AEON, MidValley Southkey, and Permas Jaya","Living in Permas Jaya","aeon permas jaya midvalley southkey lifestyle"),
    @("7","How the RTS Link Will Change Daily Life for JB-Singapore Commuters","Singapore Commuter Guide","RTS link johor bahru singapore impact"),
    @("8","Choosing the Right Unit Size: 1-Bed vs 2-Bed vs 3-Bed Apartments in JB","Homebuyer's Guide JB","johor bahru apartment size guide 1 2 3 bedroom")
)
MakeTable $h $r 0x375623 | Out-Null
Blank
Para "Note: Article bodies have not been written yet. Client must review and approve titles, confirm tone of voice, and confirm who writes the content before production begins."
Blank

# ===== 9. CONTACT =====
H1 "9. Contact & Sales Information"
Blank

H2 "Phone Numbers"
Bullet "Main Sales Line: 013-665 5111 (displayed on website)"
Bullet "Agent WhatsApp 1: 012-266 9277"
Bullet "Agent WhatsApp 2: 012-301 0776"
Bullet "Agent WhatsApp 3: 012-426 8155"
Bullet "Agent WhatsApp 4: 012-680 1680"
Bullet "Agent WhatsApp 5: 012-864 8155"
Bullet "Agent WhatsApp 6: 012-901 8671"
Para "The 6 separate WhatsApp numbers suggest a multi-agent attribution tracking system -- each number tracks leads from a different agent or sales campaign."
Blank

H2 "Missing Contact Details (Action Required)"
Bullet "Email Address: Not found on website -- must be confirmed with developer"
Bullet "Showroom Address: Not found on website -- must be confirmed with developer"
Bullet "Showroom Operating Hours: Not found -- must be confirmed with developer"
Blank

H2 "Social Media"
Para "Social links are referenced in the footer but handles and URLs were not extractable from the website source. Expected platforms:"
Bullet "Facebook (handle unknown -- confirm with developer)"
Bullet "Instagram (handle unknown -- confirm with developer)"
Bullet "YouTube (confirmed: developer has official channel with at least 5 videos)"
Bullet "TikTok (handle unknown -- confirm with developer)"
Para "Some agent sites also list WeChat and Xiaohongshu (Little Red Book) for Chinese-speaking buyers. Confirm if these platforms should be included on the new site."
Blank

# ===== 10. VIDEOS =====
H1 "10. Official Videos"
Para "Five YouTube videos related to the project were identified. The first is confirmed as embedded on the official website. Rights to the remaining videos should be confirmed with the developer before embedding on the new site."
Blank
$h = @("Video Title","URL","Status / Notes")
$r = @(
    @("Official Project Video (embedded on website)","youtube.com/watch?v=_UkRgwpy0qk","Confirmed developer video -- starts at t=111s"),
    @("Project Introduction","youtube.com/watch?v=QYOBwzjU22w","Confirm if developer-produced or agent-produced"),
    @("Phase 2 Launch Event","youtube.com/watch?v=C9HJYAeWapo","Launch event footage -- confirm rights"),
    @("Unit Tour -- 2 Bed 2 Bath (Type B)","youtube.com/watch?v=tbAxlb_nd2E","Unit walkthrough -- confirm rights"),
    @("Unit Tour -- 3 Bed 2 Bath (Type C)","youtube.com/watch?v=sCZ51vGrcb8","Unit walkthrough -- confirm rights"),
    @("Lifestyle Showcase","youtube.com/watch?v=ehJIrOw5yC0","Lifestyle video -- confirm rights")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 11. SALES STATUS =====
H1 "11. Sales Status & Market Data"
Para "Data sourced from EdgeProp (August 2025) and third-party property portals. Verify with developer before publishing."
Blank
$h = @("Metric","Figure","Source")
$r = @(
    @("Total Project Units (all phases)","2,156 units","Developer / project documents"),
    @("Phase 2 Units","1,078 units","Developer / project documents"),
    @("Units Sold as of Aug 2025","95 units (~9% of total)","EdgeProp August 2025"),
    @("Units Remaining as of Aug 2025","983 units (~91% of total)","EdgeProp August 2025"),
    @("Most Popular Price Band","RM600,000 -- RM700,000","EdgeProp August 2025"),
    @("Full Price Range (market)","RM421,500 -- RM785,800","EdgeProp August 2025"),
    @("Average Price Per Sqft","~RM650","Developer / third-party combined estimate"),
    @("Sales Stage Assessment","Early phase -- wide choice of units still available","Based on 9% take-up rate")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank
Para "The 9% take-up rate indicates the project is in an early sales phase with approximately 983 units still available. This is a buyer opportunity for preferred unit selection, floor choice, and early-entry pricing before the development gains momentum closer to the 2028 completion."
Blank

# ===== 12. PENDING INFO =====
H1 "12. Information Pending Client Confirmation"
Para "The following items were not found on the old website or any public source and must be confirmed with the client before the new website is built and launched."
Blank

H2 "Critical -- Must Confirm Before Launch"
Num "APDL / Developer Licence Number -- Legally required on all Malaysian property marketing materials under the Housing Development (Control and Licensing) Act. Currently absent from the old website."
Num "Official Pricing -- Old site masked prices (RM3xxk format). Confirm exact official launch prices per unit type and whether pricing should be publicly displayed on the new website."
Num "Phase Scope -- Confirm whether the new website covers Phase 2 only (1,078 units) or all phases (2,156 units across 4 towers)."
Num "Official Contact Email Address -- No email was found anywhere on the current website. At minimum one official email is required for the contact section."
Num "Social Media Handles and URLs -- Footer shows social icons but handles were not extractable. Confirm official accounts for Facebook, Instagram, YouTube, TikTok, and any Chinese-market platforms."
Blank

H2 "Important -- Verify Before Build"
Num "Gallery Images 1 to 12 -- The website only contained gallery renders numbered 13 to 21. Images 1 to 12 are missing. Confirm whether these renders exist and should be included."
Num "Full Unit Specification Lists -- Detailed finishing specs (flooring, tiles, sanitary ware brands, kitchen surfaces, etc.) for all unit types were not found. Request full spec sheets."
Num "Official E-Brochure PDF -- The website offers a brochure via registration form. Request a direct copy from the developer for reference."
Num "Developer Background (About Parkland Group) -- No history or track record section was found. Confirm if an About the Developer section is desired."
Num "Showroom Address and Operating Hours -- No physical address was found. Required for the Contact section."
Blank

H2 "Minor -- Nice to Have"
Num "Construction Progress Photos / Timeline -- Confirm if a progress update section is wanted."
Num "Live Unit Availability Tracker -- Agent sites show stock-level tracking. Confirm if real-time inventory display should be integrated."
Num "Car Park Allocation -- One listing mentioned free parking. Confirm how many bays are included per unit type."
Num "Furnishing Package Details -- Third-party sources mention free semi-furnishing (aircon, kitchen cabinet, shoe cabinet). Confirm exact package and current offer status."
Num "Language Versions -- Confirm if the new website should be bilingual (English + Chinese)."
Num "Tower Naming / Numbering -- Confirm official names or numbers for all 4 towers."
Num "CRM / Lead Destination -- Confirm where form submissions should go (email, CRM, WhatsApp API, or other tool)."
Blank

# ===== 13. LEGAL =====
H1 "13. Legal & Developer Information"
Blank
$h = @("Item","Details")
$r = @(
    @("Developer Legal Entity","Parkland Southern Sdn. Bhd."),
    @("Brand Name","Parkland Group"),
    @("Land Title","Commercial -- classified under the Housing Development Act (HDA)"),
    @("Key Legal Note for Buyers","Because land is commercial-titled, utility bills (electricity and water) are billed at commercial tariff rates, which are higher than standard residential rates. This must be disclosed to buyers."),
    @("APDL Number","Not displayed on current website -- legally required and must be confirmed before new site launch"),
    @("Foreign Buyer Restriction","Foreigners cannot purchase units -- open to Malaysian citizens only"),
    @("Website Copyright","2026 Parkland By The River | Parkland Group"),
    @("Original Website Design Credit","Designed by Rubilogy"),
    @("Original Website Platform","WordPress + WPBakery + Revolution Slider (Woodmart theme)")
)
MakeTable $h $r 0x1F3864 | Out-Null
Blank

# ===== 14. DOCUMENT NOTES =====
H1 "14. Document Notes"
Para "This document was compiled from content extracted from the official Parkland By The River website (parklandbytheriver.com.my) on 21 May 2026, supplemented by publicly available third-party data from EdgeProp (August 2025) and other property portals."
Blank
Para "All pricing, sales statistics, and specification data cited from third-party sources should be independently verified with the developer before being published on the new website."
Blank
Para "Items listed in Section 12 (Pending Confirmation) must be resolved before the new website enters the design and development phase. For questions or to provide the missing information, contact the Parkland By The River sales team via the main line: 013-665 5111."
Blank

$outPath = "C:\Users\hp\Desktop\project folder\Parkland-website\Parkland-By-The-River-Full-Content-Summary.docx"
$doc.SaveAs([ref]$outPath, [ref]16)
$doc.Close()
$word.Quit()
Write-Host "DONE: $outPath"
