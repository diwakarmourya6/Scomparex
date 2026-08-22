import { Smartphone, QuizPreferences, RecommendationMatch } from '../types/smartphone';


function isPriceInBudget(price: number, budget: QuizPreferences['budget']): boolean {
  switch (budget) {
    case 'under-15000':
      return price <= 18000; // soft ceiling
    case '15000-25000':
      return price >= 14000 && price <= 28000;
    case '25000-40000':
      return price >= 24000 && price <= 45000;
    case '40000-60000':
      return price >= 38000 && price <= 68000;
    case 'above-60000':
      return price >= 60000;
    default:
      return true;
  }
}

export function calculateRecommendations(
  quiz: QuizPreferences,
  phones: Smartphone[]
): RecommendationMatch[] {
  const scoredPhones = phones.map(phone => {
    let score = 50; // base score
    const reasons: string[] = [];
    const prosForUser: string[] = [];

    // 1. Budget fit (Weight: 35)
    if (isPriceInBudget(phone.price, quiz.budget)) {
      score += 35;
      reasons.push(`Fits your budget range under ₹${phone.price.toLocaleString('en-IN')}`);
    } else {
      // penalty if way outside budget
      score -= 20;
    }

    // 2. Priority Matching (Weight: 30)
    switch (quiz.priority) {
      case 'Camera':
        if (phone.scores?.camera >= 95) {
          score += 30;
          reasons.push(`Class-leading camera system (${phone.camera?.mainCamera?.split('(')[0]?.trim() || 'High-res'})`);
          prosForUser.push('Superb optical quality and portrait capabilities');
        } else if (phone.scores?.camera >= 88) {
          score += 20;
          reasons.push(`Solid 50MP+ primary shooter with OIS`);
        }
        break;
      case 'Gaming':
      case 'Performance':
        if (phone.scores?.performance >= 95) {
          score += 30;
          reasons.push(`Powered by flagship ${phone.performance?.processor || 'processor'}`);
          prosForUser.push('Handles maximum graphic settings without frame drops');
        } else if (phone.scores?.performance >= 85) {
          score += 20;
          reasons.push(`Smooth daily multitasking with ${phone.performance?.ram || 'high'}GB RAM`);
        }
        break;
      case 'Battery':
        if (phone.battery?.capacity >= 5500 || phone.battery?.chargingSpeed >= 80) {
          score += 30;
          reasons.push(`High capacity ${phone.battery?.capacity || '5000+'} mAh battery with ${phone.battery?.chargingSpeed || 'fast'}W fast charging`);
          prosForUser.push('Easily lasts over a full day of heavy screen usage');
        } else if (phone.battery?.capacity >= 5000) {
          score += 20;
          reasons.push(`Dependable 5000 mAh all-day battery life`);
        }
        break;
      case 'Display':
        if (phone.display?.refreshRate >= 120 && phone.display?.peakBrightness >= 2500) {
          score += 30;
          reasons.push(`Vivid 120Hz+ OLED screen with ${phone.display?.peakBrightness || 'high'} nits peak brightness`);
          prosForUser.push('Crystal clear HDR playback and smooth scrolling');
        } else if (phone.display?.refreshRate >= 120) {
          score += 20;
          reasons.push(`Fluid 120Hz refresh rate AMOLED`);
        }
        break;
      case 'Value for Money':
        if (phone.scores?.value >= 90) {
          score += 30;
          reasons.push('Exceptional price-to-performance ratio');
          prosForUser.push('Premium flagship-grade specs at an aggressive price point');
        } else {
          score += 15;
        }
        break;
    }

    // 3. Battery Importance (Weight: 15)
    if (quiz.batteryImportance === 'High') {
      if (phone.battery?.capacity >= 5400) {
        score += 15;
        if (!reasons.some(r => r.includes('battery'))) {
          reasons.push(`${phone.battery?.capacity || 'High capacity'} mAh battery ensures non-stop uptime`);
        }
      } else if (phone.battery?.capacity >= 5000) {
        score += 10;
      }
    } else if (quiz.batteryImportance === 'Medium') {
      if (phone.battery?.capacity >= 4500) {
        score += 10;
      }
    }

    // 4. Display Size Preference (Weight: 10)
    if (quiz.displayPreference === 'Compact phone') {
      if (phone.display?.sizeNumber <= 6.3) {
        score += 15;
        reasons.push(`Compact ${phone.display?.size || 'screen'} with ultra-light ${phone.physical?.weight || 'weight '}g ergonomics`);
        prosForUser.push('Easy one-handed comfort in pockets and hands');
      } else {
        score -= 5;
      }
    } else if (quiz.displayPreference === 'Large display') {
      if (phone.display?.sizeNumber >= 6.7) {
        score += 12;
        reasons.push(`Expansive ${phone.display?.size || 'display'} ideal for gaming and media`);
      }
    }

    // 5. Preferred Brand (Bonus: 10)
    if (quiz.preferredBrand && quiz.preferredBrand !== 'Any') {
      if (phone.brand === quiz.preferredBrand) {
        score += 10;
        reasons.push(`Matches your preferred ${phone.brand} ecosystem`);
      }
    }

    // Add generic reasons if empty
    if (reasons.length === 0) {
      reasons.push(`${phone.rating || 4.5}★ user satisfaction with ${phone.reviewCount || 100}+ verified reviews`);
      if (phone.software?.updateSupportYears) {
        reasons.push(`${phone.software.updateSupportYears} years of guaranteed software support`);
      }
    }

    if (prosForUser.length === 0) {
      if (Array.isArray(phone.pros) && phone.pros.length > 0) {
        prosForUser.push(...phone.pros.slice(0, 2));
      } else {
        prosForUser.push('Excellent overall smartphone experience');
      }
    }

    // Normalize match percentage between 60% and 99%
    const normalizedScore = Math.min(99, Math.max(65, Math.round(score)));

    return {
      phone,
      matchScore: normalizedScore,
      reasons: Array.from(new Set(reasons)).slice(0, 4),
      prosForUser: Array.from(new Set(prosForUser)).slice(0, 3)
    };
  });

  // Sort descending by match score
  return scoredPhones.sort((a, b) => b.matchScore - a.matchScore);
}
