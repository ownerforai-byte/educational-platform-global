/**
 * Physics XI Academic Companion — authored exam-anchored content, units 14-26.
 *
 * The companion of `scripts/physics-xi-academic-content-01-13.ts`; see that
 * file for what each section means and how the two are merged.
 */
import type { PhysicsXiUnitEnrichment } from "./physics-xi-academic-content-01-13";

export const PHYSICS_XI_ENRICHMENT_14_26: Record<string, PhysicsXiUnitEnrichment> = {
  "reflection-at-curved-mirror": {
    misconceptions: [
      {
        claim:
          "A convex mirror always forms a virtual, upright and diminished image, whatever the position of the object.",
        why:
          "This is true, but students often reach for it as a slogan rather than as a consequence, and then cannot explain the special case of an object at infinity, where the image tends to a point at the focus.",
        correction:
          "A convex mirror always has a virtual focus behind the mirror, so the image lies behind the mirror at a distance less than f for any real object. The image is upright, diminished (0 < |m| < 1) and lies between the pole and the focus. As the object moves to infinity the image approaches the focus and its size tends to zero.",
      },
      {
        claim:
          "The image in a concave mirror is always real.",
        why:
          "A concave mirror forms a real image only when the object lies outside the centre of curvature. Between the focus and the mirror the image is virtual, upright and magnified - the face in a shaving mirror is exactly this case.",
        correction:
          "For a concave mirror with f = R/2: object beyond C gives a real, inverted, diminished image between C and F; object at C gives the image at C; object between C and F gives a real, inverted, magnified image beyond C; object at F gives the image at infinity; object between F and the pole gives a virtual, upright, magnified image behind the mirror.",
      },
      {
        claim:
          "The mirror formula 1/v + 1/u = 1/f is true for any spherical mirror and any position of the object.",
        why:
          "The formula is a paraxial result: it holds for rays close to the principal axis and for small apertures. A spherical mirror with a wide aperture has a different focus for different zones of the surface - spherical aberration - and the simple formula no longer describes the image.",
        correction:
          "The mirror formula is exact within the paraxial (Gaussian) approximation. It requires the object and image to be small compared with the radius of curvature and the rays to make small angles with the axis. Parabolic mirrors are used for large apertures because a parabola focuses exactly, at the price of the off-axis aberrations that a sphere also has.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "An object is placed 30 cm in front of a concave mirror of focal length 10 cm. Find the position, nature and size of the image (use the Cartesian sign convention: u = -30 cm, f = -10 cm).",
        answer:
          "1/v + 1/u = 1/f gives 1/v = 1/f - 1/u = -1/10 + 1/30 = (-3 + 1)/30 = -2/30, so v = -15 cm. The image is 15 cm in front of the mirror, between F (10 cm) and C (20 cm), so it is real and inverted. Magnification m = -v/u = -(-15)/(-30) = -0.5, so the image is half the size of the object.",
      },
      {
        kind: "derivation",
        question:
          "Derive the mirror formula 1/v + 1/u = 1/f for a spherical mirror from the paraxial geometry of a ray parallel to the principal axis.",
        answer:
          "Take the pole as origin, the principal axis as the x-axis, and let C be the centre of curvature at distance R, so F is at R/2. A ray from the top of an object of height h strikes the mirror at P and is reflected through F. For small angles, a spherical mirror approximates a parabola, so the incident and reflected rays make equal angles with the normal at P. Using the small-angle geometry of the triangles formed with the axis, the ray geometry gives the relation h/h' = (R - v)/v, where h' is the image height. Combining this with the similar triangles for the ray through C, which gives h/h' = v/u, one finds h'/h = -v/u (the minus sign recording the inversion for a real image). Eliminating h/h' between the two relations and using f = R/2 gives 1/v + 1/u = 1/f. The derivation assumes paraxial rays throughout.",
      },
      {
        kind: "reasoning",
        question:
          "Why is a convex mirror fitted as the rear-view mirror in a vehicle, while a concave mirror is not, even though the convex mirror makes objects look smaller?",
        answer:
          "The deciding property is the field of view and the nature of the image. A convex mirror always forms a virtual, upright, diminished image for every object position, so the driver sees a wide field behind the vehicle at once, and the image is upright so that left and right are not reversed. A concave mirror would form a real, inverted image for objects beyond the centre of curvature, which is both disorienting and dangerous, and for close objects it would give a magnified real image with no useful field. The convex mirror therefore trades resolution for safety, and a flat mirror is used inside the car precisely because it preserves size and does not distort distances.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Reflection at Curved Mirror",
        href: "/class-11-notes/physics/chapters/reflection-at-curved-mirror",
      },
      {
        label: "Mirrors 3D lab",
        href: "/lab/ph-3d-mirrors",
      },
    ],
  },

  "refraction-at-plane-surfaces": {
    misconceptions: [
      {
        claim:
          "Light slows down in glass and keeps that slower speed when it comes back into air, so the emerging ray is displaced but otherwise unchanged.",
        why:
          "Speed is a property of the wave in the medium, and the medium it is in determines it. On returning to air the speed returns to c; what survives is the direction set by Snell's law.",
        correction:
          "The speed is c/n in the medium, so it returns to c on leaving the glass. Snell's law n1 sin(theta1) = n2 sin(theta2) is satisfied at each boundary, and because the two faces of a parallel slab are parallel the emergent ray is parallel to the incident ray, displaced sideways by t sin(i - r)/cos r.",
      },
      {
        claim:
          "Total internal reflection happens when the angle of incidence is large enough, whatever the two media.",
        why:
          "It requires the ray to travel from the optically denser medium to the optically rarer one. Going the other way (air into glass) the ray always emerges, because the refracted angle can never exceed 90 degrees.",
        correction:
          "TIR needs n1 > n2 and theta1 greater than the critical angle, sin(theta_c) = n2/n1. For glass to air the critical angle is about 41.8 degrees (n = 1.5), and for water to air about 48.6 degrees (n = 1.333).",
      },
      {
        claim:
          "A coin at the bottom of a bowl of water appears at its true depth, because light travels in straight lines.",
        why:
          "Light travels in straight lines in each medium, but the refraction at the surface bends the ray towards the normal, so the eye traces the ray back in a straight line and gets the wrong origin.",
        correction:
          "For near-normal viewing the apparent depth is h' = h (n2/n1) = h / n for an object in water viewed from air. A 10 cm deep pool therefore looks about 7.5 cm deep with n = 1.333.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A ray of light in water (n = 1.333) meets the water-air surface at an angle of incidence of 40 degrees. Find the angle of refraction in air, and state whether total internal reflection would occur at this incidence.",
        answer:
          "Snell's law: 1.333 sin 40 degrees = 1 x sin(theta2), so sin(theta2) = 1.333 x 0.6428 = 0.8569 and theta2 = 58.9 degrees (about 59 degrees). The critical angle for water to air satisfies sin(theta_c) = 1/1.333 = 0.7502, so theta_c = 48.6 degrees. Since 40 degrees < 48.6 degrees, the ray is well below the critical angle and no total internal reflection occurs.",
      },
      {
        kind: "derivation",
        question:
          "Derive the expression for the lateral shift d produced when a ray passes through a plane-parallel slab of thickness t and refractive index n, with angle of incidence i and angle of refraction r.",
        answer:
          "Inside the slab the ray travels along a path inclined at r to the normal, so over the thickness t it moves laterally by t tan r. If the emergent ray were continued straight it would travel from the point of incidence at angle i and would be displaced by t tan i. The lateral shift is the difference between these two offsets measured at the exit plane. The perpendicular distance between the incident and emergent rays is d cos r, and the geometry gives d cos r = t tan i - t tan r, so d = t (tan i - tan r) / cos r. Using Snell's law, sin i = n sin r, this can be written d = t sin(i - r) / cos r, which vanishes when i = r (normal incidence).",
      },
      {
        kind: "reasoning",
        question:
          "Explain why an optical fibre guides light, and deduce the condition on the angle of entry for a glass core of index 1.5 surrounded by cladding of index 1.4.",
        answer:
          "Light entering the core strikes the core-cladding boundary from inside the optically denser medium. If the angle of incidence at that boundary exceeds the critical angle, sin(theta_c) = n_clad/n_core = 1.4/1.5 = 0.9333, so theta_c = 68.9 degrees, the ray is totally internally reflected and is guided along the fibre with no energy lost out of the core. In practice the light bounces many times per millimetre, so even a small loss per bounce is negligible. The acceptance condition in terms of the angle theta of the entering ray to the fibre axis is sin(theta) <= sqrt(n_core^2 - n_clad^2) = sqrt(2.25 - 1.96) = sqrt(0.29) = 0.539, so theta <= 32.6 degrees; this number is the numerical aperture of the fibre, and it sets how much light can be coupled in.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Refraction at Plane Surfaces",
        href: "/class-11-notes/physics/chapters/refraction-at-plane-surfaces",
      },
      {
        label: "Refraction 3D lab",
        href: "/lab/ph-3d-refraction",
      },
      {
        label: "Optics theory lab",
        href: "/lab/ph-th-optics",
      },
    ],
  },

  "refraction-through-prisms": {
    misconceptions: [
      {
        claim:
          "A prism deviates light because it slows the light down.",
        why:
          "Slowing alone is not a deviation: the ray would resume its original direction on leaving, and a parallel-sided slab does exactly that. What bends the ray is the change of direction at each face, because the faces are not parallel.",
        correction:
          "At the first face the ray bends towards the normal (r < i) and at the second face, where it goes from dense to rare, it bends away from the normal. Because the two faces are inclined at the apex angle A, the outgoing ray is displaced by the deviation delta, and for a thin prism delta = (n - 1) A.",
      },
      {
        claim:
          "The angle of deviation of a prism is fixed, whatever the angle of incidence.",
        why:
          "The deviation varies with incidence, and it has a minimum value when the path through the prism is symmetric. Using the deviation for an arbitrary incidence is the source of most errors.",
        correction:
          "The deviation is a function of i and e, with i + e = A + delta. It is smallest for i = e, the symmetric path, and that minimum is the one tabulated. At minimum deviation n = sin((A + delta_m)/2) / sin(A/2).",
      },
      {
        claim:
          "The dispersive power of a glass is the difference between its refractive indices for violet and red light.",
        why:
          "That difference is a useful measure of dispersion but it is not the dimensionless dispersive power, which is normalised so that glasses can be compared fairly.",
        correction:
          "omega = (n_v - n_r) / (n_y - 1). For a crown glass with n_v = 1.530, n_r = 1.514 and n_y = 1.517, the difference n_v - n_r = 0.016 while the dispersive power is 0.016 / 0.517 = 0.031.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A prism of apex angle 60 degrees and refractive index 1.5 is used in the minimum-deviation position. Calculate the angle of minimum deviation, and verify the relation n = sin((A + delta_m)/2) / sin(A/2).",
        answer:
          "n = sin((A + delta_m)/2) / sin(A/2) gives 1.5 = sin((60 + delta_m)/2) / sin 30 degrees = 2 sin((60 + delta_m)/2), so sin((60 + delta_m)/2) = 0.75. Hence (60 + delta_m)/2 = 48.6 degrees and delta_m = 37.2 degrees (about 37 degrees). Substitution back gives sin(48.6)/sin(30) = 0.750/0.500 = 1.50, confirming the relation.",
      },
      {
        kind: "derivation",
        question:
          "Derive the approximate deviation of a thin prism, delta = (n - 1) A.",
        answer:
          "For a thin prism the angle of incidence i and the angle of emergence e are both small, and the refracted angles inside are r1 and r2 with r1 + r2 = A. From Snell's law at the first face, sin i = n sin r1, and since the angles are small, i = n r1. Similarly e = n r2. The total deviation is delta = (i - r1) + (e - r2) = (n - 1)(r1 + r2) = (n - 1) A. The result is independent of the angle of incidence, which is why a thin prism can be used as a spectrometer element: a thicker prism is dispersive but also strongly deviating.",
      },
      {
        kind: "reasoning",
        question:
          "A hollow prism with two parallel faces at 60 degrees is filled with water and used in the minimum-deviation position. Explain why the same instrument can measure the refractive index of a liquid, and state what the measurement gives.",
        answer:
          "The hollow prism is an optical cell whose interior can be filled with any liquid; the glass walls only serve to hold the liquid and to define the two refracting faces at the apex angle A. The light passes through the liquid exactly as it would through a solid prism of the same apex angle, so the measured minimum deviation satisfies n_liquid = sin((A + delta_m)/2) / sin(A/2). With A = 60 degrees and a measured delta_m of 44.8 degrees, n = sin(52.4)/sin(30) = 0.792/0.500 = 1.58... more precisely, using the standard value for water near 1.333 the expected deviation is 2 sin^-1(n sin 30) - 60 = 2 x 41.8 - 60 = 23.6 degrees, and the measured deviation gives the liquid's index directly. The method needs a narrow slit and a spectrometer, since the deviation must be measured precisely.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Refraction through Prisms",
        href: "/class-11-notes/physics/chapters/refraction-through-prisms",
      },
      {
        label: "Prism 3D lab",
        href: "/lab/ph-3d-prism",
      },
      {
        label: "Optics theory lab",
        href: "/lab/ph-th-optics",
      },
    ],
  },

  lenses: {
    misconceptions: [
      {
        claim:
          "A converging lens always forms a real image.",
        why:
          "The position of the object decides the case. Inside the focal length the image is virtual, upright and magnified - the image in a magnifying glass, and the near point of a relaxed eye.",
        correction:
          "For a converging lens: object beyond 2f gives a real, inverted, diminished image between f and 2f; at 2f the image is at 2f and the same size; between f and 2f the image is real, inverted and magnified beyond 2f; at f the image is at infinity; inside f the image is virtual, upright and magnified, on the same side as the object.",
      },
      {
        claim:
          "A lens's power depends on the glass it is made of and on how fast light travels in it.",
        why:
          "The power of a lens in air depends only on its focal length, and the focal length is fixed by the geometry and by the refractive index relative to the surroundings. Speed alone does not set the power.",
        correction:
          "P = 1/f in dioptres, with f in metres. From the lens-maker's formula, 1/f = (n - 1)(1/R1 - 1/R2) in air, so the power is set by the relative refractive index n_medium and the curvatures. A lens of the same shape but made of a denser glass has a shorter focal length and a greater power.",
      },
      {
        claim:
          "Two thin lenses in contact can be replaced by a single lens whose power is the sum of their powers.",
        why:
          "That is true only for thin lenses in contact, where the separation is negligible compared with the focal lengths and the lenses can be treated as a single element.",
        correction:
          "In contact, P = P1 + P2. Separated by a distance d, the equivalent power is P = P1 + P2 - d P1 P2, and the separation term is exactly why telephoto and zoom combinations are designed with the spacing as a variable.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A converging lens of focal length 20 cm forms a real image of an object placed 60 cm from the lens. Find the image distance and the magnification, and state the power of the lens.",
        answer:
          "1/v = 1/f + 1/u with u = 60 cm and f = 20 cm gives 1/v = 1/20 - 1/60 = (3 - 1)/60 = 2/60, so v = 30 cm. The image is real and inverted, 30 cm from the lens. Magnification m = v/u = 30/60 = 0.5, so the image is half the object's size. Power P = 1/f = 1/0.20 = 5 D.",
      },
      {
        kind: "derivation",
        question:
          "Derive the lens-maker's formula for a thin lens in air, 1/f = (n - 1)(1/R1 - 1/R2), from the refraction at the two spherical surfaces.",
        answer:
          "For the first surface, refraction in a spherical surface gives n2/v1 - n1/u = (n2 - n1)/R1 with n1 = 1 and n2 = n. For the second surface, n/v - n/v1 = (1 - n)/R2, and adding the two equations eliminates the intermediate distance v1: n/v - 1/u = (n - 1)(1/R1 - 1/R2). For a thin lens the object and image distances are measured from the same plane, so 1/v - 1/u = 1/f, which identifies the lens-maker's formula. The sign convention (Cartesian, with light travelling in the positive direction) decides the signs of R1 and R2: a surface convex to the incident light has R1 positive.",
      },
      {
        kind: "reasoning",
        question:
          "A photographer stops the lens down from f/2.8 to f/16 to increase depth of field. Explain what is gained and what is lost, and identify the physical limit that eventually stops the gain.",
        answer:
          "Stopping down reduces the diameter of the beam admitted by the lens, and a narrower beam makes the range of object distances that map to an acceptable circle of confusion smaller, so the depth of field grows - the gain. The cost is less light: the exposure time must be lengthened by the square of the stop ratio (about 32x in area between f/2.8 and f/16) or the ISO raised, and at slow speeds the image picks up camera shake. There is also a hard limit: a point object is imaged not as a point but as an Airy diffraction pattern of angular radius 1.22 lambda / D, so as the aperture is reduced the diffraction blur grows and eventually overwhelms the gain from the smaller geometric circle of confusion. The optimum is around f/8 to f/11 for a full-frame camera.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Lenses",
        href: "/class-11-notes/physics/chapters/lenses",
      },
      {
        label: "Lenses 3D lab",
        href: "/lab/ph-3d-lenses",
      },
      {
        label: "Optics lab",
        href: "/lab/ph-calc-optics",
      },
    ],
  },

  dispersion: {
    misconceptions: [
      {
        claim:
          "Dispersion means that different colours travel at different speeds, and therefore the colour we see is the colour of the light itself.",
        why:
          "The second part is wrong: the colour we perceive is set by the frequency, which is unchanged when light enters a medium. Only the speed and wavelength change.",
        correction:
          "When light enters a medium its frequency is fixed by the source, so v = c/n and the wavelength shortens: lambda_medium = lambda_vacuum / n. A prism does not change the frequency of any component, so the spectrum it produces still has the same colours as the source; the prism only separates the directions of the different frequencies.",
      },
      {
        claim:
          "The dispersive power of a glass is the difference between its refractive indices for violet and red light.",
        why:
          "That difference is a measure of how much the glass disperses, but it is not the dimensionless dispersive power, which is normalised so that different glasses can be compared.",
        correction:
          "omega = (n_v - n_r) / (n_y - 1). With n_v = 1.530, n_r = 1.514, n_y = 1.517 the difference is 0.016 but the dispersive power is 0.016 / 0.517 = 0.031. The normalisation matters because glasses differ in their overall index as well as in their dispersion.",
      },
      {
        claim:
          "The speed of light in a medium can be greater than c, which shows that Einstein is wrong.",
        why:
          "The speed that can exceed c is the group velocity of a strongly dispersive pulse, and the group velocity is not the speed at which information or a single crest travels. No signal outruns c.",
        correction:
          "v_g = c / (n - lambda dn/dlambda) can be negative or greater than c near an absorption band, but the phase velocity c/n and the velocity of the front of a pulse never exceed c, and causality is preserved. The group velocity is a property of a pulse in a strongly dispersive medium, not a transport speed for anything.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A crown glass has refractive indices n_v = 1.530, n_y = 1.517 and n_r = 1.514. Find its dispersive power, and find the angle of deviation of a 60 degree prism of this glass at minimum deviation for the yellow line.",
        answer:
          "Dispersive power omega = (n_v - n_r)/(n_y - 1) = (1.530 - 1.514)/(1.517 - 1) = 0.016/0.517 = 0.0310. For the yellow line, n = sin((A + delta_m)/2)/sin(A/2) gives 1.517 = sin((60 + delta_m)/2)/0.5, so sin((60 + delta_m)/2) = 0.7585 and (60 + delta_m)/2 = 49.3 degrees, hence delta_m = 38.6 degrees. The angular dispersion between the violet and red lines is then (n_v - n_r) A = 0.016 x 60 degrees = 0.96 degrees, which matches the typical figure of about 1 degree for a 60 degree crown-glass prism.",
      },
      {
        kind: "derivation",
        question:
          "Derive the angular dispersion produced by a thin prism between two wavelengths, and relate it to the dispersive power of the glass.",
        answer:
          "For a thin prism the deviation for a wavelength lambda is delta = (n(lambda) - 1) A. The angular dispersion between two wavelengths is therefore delta_v - delta_r = (n_v - n_r) A. The dispersive power is defined as omega = (n_v - n_r)/(n_y - 1), so the angular dispersion can be written delta_v - delta_r = omega (n_y - 1) A, which shows that for a fixed glass and apex angle the dispersion is proportional to omega. Since the deviation of a prism is small, a prism is used as the dispersing element of a spectrometer and a telescope is used to view the spectrum without further deviation.",
      },
      {
        kind: "reasoning",
        question:
          "A spectroscope uses a collimator, a prism and a telescope. Explain the function of each part, and explain how the same arrangement can be used to measure the wavelength of a spectral line.",
        answer:
          "The collimator is a lens with a narrow slit at its focal plane, so the light from the slit emerges as a parallel beam; without it the prism would simply produce a blurred image of the source. The prism disperses the beam by an amount that depends on wavelength, so the emergent beam contains a spectrum. The telescope then focuses that spectrum onto the eyepiece, and the scale on the prism table or the vernier measures the deviation angle for each colour. Because the deviation of a prism in the minimum-deviation position is known as a function of n, and n as a function of wavelength, measuring the deviation of an unknown line and inverting the relation yields its wavelength. This is how stellar spectra give the composition of stars and how the redshift of a galaxy is measured.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Dispersion",
        href: "/class-11-notes/physics/chapters/dispersion",
      },
      {
        label: "Prism 3D lab",
        href: "/lab/ph-3d-prism",
      },
      {
        label: "Optics theory lab",
        href: "/lab/ph-th-optics",
      },
    ],
  },

  "electric-charges": {
    misconceptions: [
      {
        claim:
          "Charging by friction creates charge, so a charged body has more charge than it had before.",
        why:
          "Friction only separates and transfers electrons that were already there. The total charge of the system is conserved, and each body ends up with an equal and opposite charge.",
        correction:
          "Rubbing transfers electrons from one surface to the other, so one body becomes negative and the other positive with equal magnitude. The total charge of the two-body system is unchanged; charge is conserved in every known interaction.",
      },
      {
        claim:
          "Two identical conducting spheres in contact are given a charge Q. When they are separated, each carries Q/2.",
        why:
          "That is true only if the spheres are identical and share the charge equally. If the spheres differ in size, the smaller one takes a larger share because its potential rises faster for the same charge, and the system has a unique equilibrium.",
        correction:
          "For identical spheres, symmetry gives Q/2 each. For different spheres, the charge divides in proportion to their radii (for well-separated spheres), so the smaller sphere ends up with more than half the charge. The total is still Q.",
      },
      {
        claim:
          "Coulomb's law applies to any two charged objects, whatever their shape and size.",
        why:
          "The law is exact for point charges, or for spherically symmetric charge distributions. For extended bodies the force must be found by integration, and the result depends on the geometry.",
        correction:
          "Coulomb's law F = k q1 q2 / r^2 holds for point charges in a uniform medium. For a uniformly charged spherical shell, the external field is exactly that of a point charge at the centre (the shell theorem) and the internal field is zero, so the law applies externally to spheres as well.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Two point charges of +2.0 microcoulomb and -3.0 microcoulomb are placed 0.50 m apart in air. Find the magnitude and direction of the force between them, and the force on a 1.0 microcoulomb charge placed on the line joining them, 0.20 m from the +2.0 microcoulomb charge.",
        answer:
          "F = k q1 q2 / r^2 = 8.99 x 10^9 x (2.0 x 10^-6)(3.0 x 10^-6) / 0.25 = 8.99 x 10^9 x 6.0 x 10^-12 / 0.25 = 0.216 N, attractive because the charges have opposite signs. For the third charge, the field of the +2.0 microcoulomb charge at 0.20 m is E1 = k q1 / r^2 = 8.99 x 10^9 x 2.0 x 10^-6 / 0.04 = 4.5 x 10^5 N/C, directed away from the + charge (towards the -3.0 microcoulomb charge, 0.30 m away). The field of the -3.0 microcoulomb charge at that point is E2 = 8.99 x 10^9 x 3.0 x 10^-6 / 0.09 = 3.0 x 10^5 N/C, directed towards the - charge, i.e. in the same direction as E1. Net E = 7.5 x 10^5 N/C, so the force on the 1.0 microcoulomb charge is F = q E = 0.75 N in the same direction (towards the negative charge).",
      },
      {
        kind: "derivation",
        question:
          "Use Gauss's law to show that the electric field outside a uniformly charged thin spherical shell of radius R and total charge Q is the same as that of a point charge Q at the centre, and that the field inside the shell is zero.",
        answer:
          "Draw a concentric Gaussian sphere of radius r > R. By symmetry the field is radial and has the same magnitude everywhere on it, so the flux is E x 4 pi r^2. Gauss's law gives E x 4 pi r^2 = Q / epsilon0, so E = Q / (4 pi epsilon0 r^2) = k Q / r^2, exactly the field of a point charge at the centre. For r < R the same Gaussian surface encloses no charge, so the flux is zero; by symmetry E must be zero, and the field inside a charged shell is indeed zero. The same argument with a cylindrical Gaussian surface gives the field of an infinite line charge, E = lambda / (2 pi epsilon0 r), and with a pillbox gives the field of an infinite charged plane, E = sigma / (2 epsilon0).",
      },
      {
        kind: "reasoning",
        question:
          "Two identical metal spheres on insulating handles are in contact, and a charge Q is transferred onto the pair. They are then separated without discharging. Explain what happens to the charge on each sphere, and what would change if the spheres were of different sizes.",
        answer:
          "While the spheres touch they behave as one conductor, and the charge Q spreads over the combined surface until the whole is at one potential. When they are separated, each keeps whatever charge it had at that moment, and the total remains Q. For identical spheres the symmetry of the situation means each carries Q/2. If the spheres have different radii, the smaller one has a smaller capacitance per unit charge and its potential rises more steeply, so at equilibrium the smaller sphere carries more than half of the charge; for well-separated spheres the split is in proportion to the radii, and the charge flows from the larger to the smaller sphere as they are brought apart, because the smaller sphere's potential is then higher. The physics is the same in both cases: charge flows until the two spheres are at the same potential.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Electric Charges",
        href: "/class-11-notes/physics/chapters/electric-charges",
      },
      {
        label: "Electrostatics theory lab",
        href: "/lab/ph-th-electro",
      },
      {
        label: "Electrostatics 3D lab",
        href: "/lab/ph-3d-electrostatics",
      },
    ],
  },

  "electric-field": {
    misconceptions: [
      {
        claim:
          "Electric field lines are tubes of force carrying energy, so the number of lines meeting a surface tells you how much energy is there.",
        why:
          "Field lines are a bookkeeping device, not physical threads. Their number is arbitrary and can be rescaled; what they represent is the direction of the field and, through their density, the strength of the field.",
        correction:
          "A field line is drawn tangent to E at every point, and the number of lines crossing a surface is proportional to the flux through it, not to energy. The energy density of an electric field is (1/2) epsilon0 E^2, which depends on the field strength, not on any choice of line density.",
      },
      {
        claim:
          "Inside a conductor in electrostatic equilibrium the electric field is zero, so a charged conductor has no field at all.",
        why:
          "The field is zero only inside the material of the conductor. Outside the conductor the field is not zero, and for a charged conductor it extends into the surrounding space, falling off as 1/r^2 for a sphere.",
        correction:
          "Free charges in a conductor move until the net force on them vanishes, so E = 0 within the material. The field outside the surface is perpendicular to it and is given by E = sigma / epsilon0 just outside, and by the equivalent point charge at the centre for a spherical conductor.",
      },
      {
        claim:
          "An uncharged object is never affected by a charged one.",
        why:
          "Charged objects polarise neutral ones: the charges in the neutral body redistribute, so it experiences a net attraction. This is why a charged rod picks up bits of paper.",
        correction:
          "In a neutral conductor the free electrons move slightly towards or away from the charged rod, producing an induced dipole and a net attraction that survives even when the rod is subsequently removed. The effect is much weaker than the force between two charged objects, but it is real and it is how electrophoresis and electrostatic dust collection work.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Find the electric field at a point 10 cm from a point charge of 5.0 microcoulomb in air, and the force on an electron placed there.",
        answer:
          "E = k q / r^2 = 8.99 x 10^9 x 5.0 x 10^-6 / (0.10)^2 = 8.99 x 10^9 x 5.0 x 10^-6 / 0.01 = 4.5 x 10^6 V/m, directed radially outward. The force on the electron is F = q E = 1.602 x 10^-19 x 4.5 x 10^6 = 7.2 x 10^-13 N, directed opposite to the field (inwards), because the electron is negatively charged.",
      },
      {
        kind: "derivation",
        question:
          "Derive Gauss's law, integral form, from the fact that the flux of the field of a point charge through any closed surface is independent of the shape of that surface.",
        answer:
          "For a point charge q, the field at distance r is E = q / (4 pi epsilon0 r^2). The flux through a closed surface S is the integral of E . dA; a spherical surface of radius r gives E x 4 pi r^2 = q / epsilon0. Because the field of a point charge is radial and its magnitude falls as 1/r^2, the same flux results for any closed surface enclosing the charge, and zero for a surface that does not. For a distribution of charges the total flux is the sum of the contributions, so the integral form is integral(S) E . dA = (1 / epsilon0) sum q_enclosed, or equivalently the differential form div E = rho / epsilon0. Superposition makes the result exact for any charge distribution, which is what makes Gauss's law the tool of choice for symmetric problems.",
      },
      {
        kind: "reasoning",
        question:
          "A charged glass rod is brought near, but not touching, a light metal sphere suspended on a thread. The sphere is attracted to the rod. Explain this, and predict what happens if the rod is touched to the sphere and then removed while the sphere is still close to the rod.",
        answer:
          "The rod polarises the sphere: the free electrons in the metal shift slightly towards or away from the rod, so the near side of the sphere carries charge of opposite sign to the rod and the far side carries like charge. The nearer opposite charge is closer to the rod than the farther like charge, so the attraction outweighs the repulsion and the net force is towards the rod. On touching, charge flows between the rod and the sphere until they are at the same potential, and the sphere is left with a net charge of the same sign as the rod. When the rod is then removed, that net charge spreads uniformly over the sphere, and the force becomes repulsive. The attraction before contact is due to induction; the repulsion after contact is due to the transferred charge.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Electric Field",
        href: "/class-11-notes/physics/chapters/electric-field",
      },
      {
        label: "Electrostatics 3D lab",
        href: "/lab/ph-3d-electrostatics",
      },
      {
        label: "Electricity unit suite 3D",
        href: "/lab/ph-3d-electricity-i",
      },
    ],
  },

  "potential-potential-difference-and-potential-energy": {
    misconceptions: [
      {
        claim:
          "A charge at a point where the potential is zero must have zero potential energy.",
        why:
          "Potential energy of a charge is q V, and the zero of potential is a matter of convention, not of physics. Moving the zero changes every potential energy by the same constant amount.",
        correction:
          "Only differences in potential are physical. A charge can have a large potential energy in one convention and a small one in another, and the force it feels depends only on the gradient of the potential, never on the value at a point.",
      },
      {
        claim:
          "A negative potential means a negative potential energy and therefore a force pushing the charge the wrong way.",
        why:
          "The sign of the potential energy depends on the sign of the charge as well as on the potential, and the force is set by the field, which points from high to low potential.",
        correction:
          "For a negative charge, U = q V is positive where V is negative, and the force on it is F = q E, which points towards higher potential. The rule to remember is: a positive charge moves towards lower potential, a negative charge towards higher potential.",
      },
      {
        claim:
          "Because potential is a scalar, the work done to bring a charge in from infinity is independent of the path taken.",
        why:
          "That is right, and the reason is that the electrostatic field is conservative - the work depends only on the endpoints. But the path independence comes from the field, not from the potential being a scalar.",
        correction:
          "The field of a charge distribution is conservative, so the line integral of E . dl depends only on the end points and equals -(V_final - V_initial). Scalars alone would not guarantee this: the magnetic field is also expressible with a scalar potential in some situations, yet the work done by it around a closed loop is generally not zero.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Find the potential at a point 30 cm from a point charge of +2.0 microcoulomb in air, and the potential energy of an electron at that point.",
        answer:
          "V = k q / r = 8.99 x 10^9 x 2.0 x 10^-6 / 0.30 = 5.99 x 10^4 V (about 60 kV). The potential energy of the electron is U = q V = (-1.602 x 10^-19)(5.99 x 10^4) = -9.6 x 10^-15 J, which is -60 eV, since an electron volt is 1.602 x 10^-19 J. The negative sign reflects attraction to the positive source charge.",
      },
      {
        kind: "derivation",
        question:
          "Derive the potential at a point a distance r from a point charge Q, and then the potential energy of a second charge q placed there.",
        answer:
          "The potential difference is defined by V_B - V_A = -integral(A to B) E . dl. For a point charge the field is radial, E = k Q / r^2, so moving from a point at infinity to a point at distance r gives V(r) - V(infinity) = -integral(infinity to r) k Q / r'^2 dr' = + k Q / r. With V(infinity) = 0, V = k Q / r, and more generally V(r) = k Q / r + constant. The potential energy of a charge q at that point is U = q V = k q Q / r, since the definition of the potential energy of a charge in a field is U = q V. Note that only differences in V, and hence only differences in U, are physically meaningful.",
      },
      {
        kind: "reasoning",
        question:
          "A proton is released from rest in the field of a fixed negative charge. Describe the motion in terms of potential and potential energy, and say what quantity is conserved, and why the proton's speed increases even though its potential energy decreases.",
        answer:
          "The proton starts at some potential V and potential energy U = e V, and the field accelerates it towards the negative charge, i.e. towards higher potential. As it moves, its potential energy decreases and its kinetic energy increases by exactly the same amount, because the field is conservative and the work done by it is the negative of the change in potential energy. The total energy U + K is therefore conserved; no energy is created, it is converted from potential to kinetic form. The proton's speed is greatest near the source charge, where the potential energy is most negative, and would become infinite only if it were allowed to spiral into the source - in practice it radiates and the classical picture breaks down.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Potential, Potential Difference and Potential Energy",
        href: "/class-11-notes/physics/chapters/potential-potential-difference-and-potential-energy",
      },
      {
        label: "Electrostatics theory lab",
        href: "/lab/ph-th-electro",
      },
      {
        label: "Electricity symbols reference",
        href: "/lab/ph-symbols-electricity",
      },
    ],
  },

  capacitor: {
    misconceptions: [
      {
        claim:
          "A capacitor stores charge, and the energy of a charged capacitor is the energy of the charges it holds.",
        why:
          "The energy is stored in the electric field between the plates, not in the charges themselves. A charged capacitor that is short-circuited loses all its energy in the spark, even though the charge on the plates was never 'used up'.",
        correction:
          "The stored energy is U = (1/2) C V^2 = Q^2 / (2C) = (1/2) Q V, and it is the energy of the field. Equivalently the energy density is (1/2) epsilon0 E^2, so energy is stored wherever the field is - between the plates, not on them.",
      },
      {
        claim:
          "Capacitors in series add their capacitances, exactly as resistors in series add their resistances.",
        why:
          "In series the same charge is on every capacitor, and the total voltage is the sum of the voltage drops; since V = Q/C, the reciprocal rule follows. In parallel the voltages are equal and the charges add, so the capacitances add directly.",
        correction:
          "Parallel: C = C1 + C2 + ...; series: 1/C = 1/C1 + 1/C2 + ..., so the series combination is always smaller than the smallest capacitor. This is the opposite of the resistor rule, and the standard exam trap.",
      },
      {
        claim:
          "The capacitance of a capacitor depends on the charge stored on it.",
        why:
          "Capacitance is fixed by the geometry and by the dielectric; it is the property that makes V proportional to Q. If C depended on Q, the relation V = Q/C would not be linear.",
        correction:
          "C = epsilon0 epsilon_r A / d for a parallel-plate capacitor depends only on the plate area, the separation and the dielectric. The charge and voltage change with the situation; C does not.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A 10 microfarad capacitor is charged to 12 V and then disconnected from the battery. Find the charge stored and the energy in the capacitor, and the energy per unit volume if the plates are 5 cm square and separated by 2 mm.",
        answer:
          "Q = C V = 10 x 10^-6 x 12 = 1.2 x 10^-4 C (120 microcoulomb). Energy U = (1/2) C V^2 = 0.5 x 10 x 10^-6 x 144 = 7.2 x 10^-4 J. The plate area is A = (0.05)^2 = 2.5 x 10^-3 m^2 and the volume of field is A d = 2.5 x 10^-3 x 2 x 10^-3 = 5 x 10^-6 m^3, so the energy density is 7.2 x 10^-4 / 5 x 10^-6 = 144 J/m^3. (After disconnection the charge and the energy are unchanged.)",
      },
      {
        kind: "derivation",
        question:
          "Derive the capacitance of a parallel-plate capacitor and the energy it stores, using Gauss's law for the field between the plates.",
        answer:
          "Between large parallel plates of area A carrying charges of density sigma = Q/A, a Gaussian pillbox straddling one plate gives E A = sigma A / epsilon0, so E = sigma / epsilon0 = Q / (epsilon0 A). The potential difference between the plates separated by d is V = E d = Q d / (epsilon0 A). Hence C = Q / V = epsilon0 A / d, and with a dielectric of relative permittivity epsilon_r, C = epsilon0 epsilon_r A / d. The energy stored is obtained from the work done in charging: U = integral from 0 to Q of (q/C) dq = Q^2 / (2C) = (1/2) C V^2. The field is uniform only away from the edges, so the derivation assumes the plate separation is small compared with the plate dimensions.",
      },
      {
        kind: "reasoning",
        question:
          "A 2 microfarad and a 3 microfarad capacitor are connected in series across a 12 V battery, and then, while still connected, a third capacitor is added in parallel with the 2 microfarad one. Find the charges and voltages across the capacitors before and after the change.",
        answer:
          "Initially, in series, the same charge is on both: 1/C = 1/2 + 1/3, so C = 1.2 microfarad and Q = C V = 1.2 x 12 = 14.4 microcoulomb on each. The 2 microfarad capacitor has 7.2 V across it and the 3 microfarad one 4.8 V. Adding a 3 microfarad capacitor in parallel with the 2 microfarad one makes a 5 microfarad combination; in series with 3 microfarad the total is 1/(1/5 + 1/3) = 1.875 microfarad, so the charge on the series string becomes 1.875 x 12 = 22.5 microcoulomb. The 5 microfarad pair carries 22.5 microcoulomb at 4.5 V and the 3 microfarad one carries 22.5 microcoulomb at 7.5 V. The lesson is the practical one: a small capacitor in series with a large one takes a disproportionate share of the voltage, and connecting a battery across an isolated small capacitor can exceed its rating.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Capacitor",
        href: "/class-11-notes/physics/chapters/capacitor",
      },
      {
        label: "Electrostatics 3D lab",
        href: "/lab/ph-3d-electrostatics",
      },
      {
        label: "Electricity unit suite 3D",
        href: "/lab/ph-3d-electricity-i",
      },
    ],
  },

  "dc-circuits": {
    misconceptions: [
      {
        claim:
          "Ohm's law V = IR applies to every component, so every resistor has a fixed resistance.",
        why:
          "Ohm's law is a statement about a class of materials whose resistance does not change with the applied voltage. Many everyday components are not ohmic.",
        correction:
          "For a metal conductor at constant temperature, R is constant and V is proportional to I. A filament lamp is non-ohmic: as the current rises the filament heats, its resistance rises and the V-I graph curves. A diode is strongly non-ohmic and conducts in only one direction.",
      },
      {
        claim:
          "The current in a circuit is consumed by the components it passes through.",
        why:
          "Current is the rate of flow of charge and is conserved everywhere in a series circuit; energy is transferred, not charge.",
        correction:
          "Charge is conserved: the same charge per second passes through every element of a series circuit, which is Kirchhoff's current law. What is 'used up' is energy: the potential energy of the charges falls as they do work against resistance, and that energy becomes heat.",
      },
      {
        claim:
          "A voltmeter connected in series across a component measures the drop across it.",
        why:
          "A voltmeter must be connected in parallel, and an ammeter in series. A voltmeter in series has a very large resistance, so it effectively opens the circuit.",
        correction:
          "Voltmeters have a very high resistance (ideally infinite) and are connected in parallel with the component; ammeters have a very low resistance and are connected in series. Connecting a voltmeter in series leaves almost no current, and the reading is then the supply voltage rather than a drop across the component.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "A cell of emf 12 V and internal resistance 0.50 ohm is connected to a load of 5.5 ohm. Find the current, the terminal voltage of the cell and the power delivered to the load.",
        answer:
          "I = E / (R + r) = 12 / (5.5 + 0.5) = 2.0 A. Terminal voltage V = E - I r = 12 - 2.0 x 0.5 = 11 V (and V = I R = 2.0 x 5.5 = 11 V, as it must be). Power in the load P = I V = 2.0 x 11 = 22 W. The power lost inside the cell is I^2 r = 4.0 x 0.5 = 2.0 W, and the total power supplied by the cell is E I = 24 W, so the energy balance is 22 + 2 = 24 W.",
      },
      {
        kind: "derivation",
        question:
          "Derive Kirchhoff's loop law from the conservation of energy, and show that the sum of the potential changes around any closed loop in a circuit is zero.",
        answer:
          "Take any closed loop in a steady circuit. Around the loop, the work done by the electric field in moving a charge q once around must be zero, because the charge returns to its starting point with the same energy: the electrostatic field is conservative, so the work around a closed path vanishes. The work done by the field in moving the charge through each element is q times the potential change across it, so q sum(delta V) = 0 and sum(delta V) = 0. In terms of the circuit elements, the sum of the emf contributions equals the sum of the voltage drops: sum(E) = sum(I R). The same argument applied to a node, where charge is neither created nor destroyed, gives Kirchhoff's current law, sum(I_in) = sum(I_out).",
      },
      {
        kind: "reasoning",
        question:
          "Explain, using the V-I characteristic of a filament lamp, why a lamp of rated 100 W, 230 V behaves differently from a resistor when the supply voltage is varied, and what happens if the supply voltage is suddenly increased.",
        answer:
          "For a metal resistor the resistance is constant, so I is proportional to V and the power rises as V^2. For a filament lamp the current heats the filament, the metal becomes hotter, its resistance rises (the resistivity of a metal increases with temperature), and the V-I curve bends upwards, so the current grows less than proportionally. The rated values 100 W and 230 V give a nominal current of 0.435 A and a resistance of 529 ohms at the working temperature, but the cold resistance is much smaller, which is why a lamp struck from cold draws a large initial current and the filament glows up over a fraction of a second. If the supply voltage is raised, the operating point moves up the curve, the filament runs hotter, its resistance is still higher, and the power - and the temperature, and the rate of evaporation of the filament - rise sharply, which is why overvoltage shortens the life of a lamp.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: DC Circuits",
        href: "/class-11-notes/physics/chapters/dc-circuits",
      },
      {
        label: "Ohm's law calculator",
        href: "/lab/ph-calc-ohms",
      },
      {
        label: "Current electricity theory lab",
        href: "/lab/ph-th-current",
      },
    ],
  },

  "nuclear-physics": {
    misconceptions: [
      {
        claim:
          "A heavier nucleus is always more tightly bound, so the most massive nuclei are the most stable.",
        why:
          "Binding energy per nucleon is not monotonic in mass number. It rises to a maximum near iron-56 and then falls, which is why heavy nuclei are unstable and can release energy by fission.",
        correction:
          "The binding energy per nucleon is about 8.8 MeV at iron-56, about 7.6 MeV for uranium-238 and about 1.1 MeV for a lead nucleus at the extreme end. Nuclei heavier than iron gain energy by splitting, and nuclei lighter than iron gain it by fusing, because in both cases the products lie closer to the maximum of the curve.",
      },
      {
        claim:
          "A radioactive atom decays because it is unstable and 'spits out' radiation at a random moment.",
        why:
          "The decay is not a random event in the sense of being unpredictable in principle: the probability per unit time is fixed by the nucleus, but the instant at which any particular nucleus decays is not determined in advance.",
        correction:
          "Radioactive decay obeys the law dN/dt = -lambda N, with a half-life T = ln2 / lambda that is a property of the isotope, not of the individual atom. Over many nuclei the law is exact; for a single nucleus only the probability is known. This statistical character is the basis of radiometric dating.",
      },
      {
        claim:
          "In nuclear reactions mass is not conserved, because mass can be converted into energy.",
        why:
          "Mass is not lost; it is the total mass-energy that is conserved. The 'missing' mass in a reaction is exactly the mass equivalent of the released energy, and the rest masses of the products add to more than the rest mass of the reactants.",
        correction:
          "In every reaction the total mass-energy, and therefore the total baryon number and the total charge, is conserved. For example, 4 neutrons converting into a helium nucleus release 0.006 u of mass, which is 5.6 MeV of energy, and the sum of the rest masses of the products is greater than the sum of the rest masses of the reactants by exactly that amount.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Find the energy equivalent of 1 unified atomic mass unit, and the energy released in the fusion of four protons to form one helium-4 nucleus with the release of two positrons and two neutrinos (mass defect about 0.0187 u).",
        answer:
          "1 u = 1.66054 x 10^-27 kg, so E = m c^2 = 1.66054 x 10^-27 x (2.9979 x 10^8)^2 = 1.4924 x 10^-10 J. In electron volts, 1.4924 x 10^-10 / 1.602 x 10^-19 = 9.315 x 10^8 eV = 931.5 MeV. For the fusion reaction, the mass defect of 0.0187 u corresponds to 0.0187 x 931.5 = 17.4 MeV, which is the energy released per helium-4 nucleus produced. This is the basis of fusion in the Sun and in thermonuclear weapons.",
      },
      {
        kind: "derivation",
        question:
          "Derive the binding energy per nucleon of a nucleus from the masses of its constituent nucleons, and explain why the packing fraction is the useful measure of the energy released.",
        answer:
          "The mass of a nucleus is less than the sum of the masses of its free nucleons by the mass defect, dm = Z m_p + (A - Z) m_n - m_nucleus. The missing mass is the mass of the energy that holds the nucleus together, so the binding energy is B = dm c^2, and the binding energy per nucleon is B / A. The packing fraction is f = dm / (Z m_p + (A - Z) m_n), the fraction of the mass that is converted into binding energy, so B = f A (sum of the free nucleon masses) c^2. For iron-56, f is about 0.0087 and B/A is about 8.8 MeV per nucleon, the maximum of the curve; for uranium-238, f is about 0.0071 and B/A about 7.6 MeV.",
      },
      {
        kind: "reasoning",
        question:
          "Explain, using the binding energy per nucleon curve, why both fission of a heavy nucleus and fusion of a light nucleus release energy, while the splitting of a mid-mass nucleus absorbs energy.",
        answer:
          "The binding energy per nucleon is a measure of how tightly bound each nucleon is, and a reaction releases energy when the products have a greater total binding energy than the reactants. For uranium-238, B/A is about 7.6 MeV; the fission products around mass 95 have B/A of about 8.5 MeV, so the products are more tightly bound and the difference, about 200 MeV, is released. For four protons, B/A is effectively zero since free protons are not bound, while the helium-4 product has B/A of 28.3/4 = 7.1 MeV, so about 28 MeV is released. Near the maximum of the curve, at iron-56, splitting a nucleus moves the products to a lower B/A, so the process absorbs energy instead. This single curve explains why the iron group is the end point of stellar fusion and why both fission and fusion are viable energy sources.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Nuclear Physics",
        href: "/class-11-notes/physics/chapters/nuclear-physics",
      },
      {
        label: "Quantum 3D lab",
        href: "/lab/ph-3d-quantum",
      },
      {
        label: "Modern physics theory lab",
        href: "/lab/ph-th-modern",
      },
    ],
  },

  solids: {
    misconceptions: [
      {
        claim:
          "An insulator has no electrons, while a metal has free electrons that move freely through the lattice.",
        why:
          "Every solid has electrons. The difference is the band structure: in a metal the valence band and the conduction band overlap, whereas in an insulator a band gap separates a full valence band from an empty conduction band.",
        correction:
          "An insulator has as many electrons as a metal; they are simply bound in a full valence band, and the energy needed to reach the conduction band (the band gap) is far too large for thermal energy at ordinary temperatures. A semiconductor has a small gap (about 1.12 eV for silicon), so some electrons are thermally excited across it, which is why its conductivity rises with temperature.",
      },
      {
        claim:
          "Doping adds free charge carriers to a semiconductor.",
        why:
          "Doping does not add carriers directly; it adds impurity levels close to the band edges, and the carriers appear when those levels are ionised, by thermal energy in n-type material or by the release of bound electrons in p-type.",
        correction:
          "In n-type silicon, a group V donor (for example phosphorus) contributes a fifth valence electron which is only weakly bound and is easily promoted into the conduction band, leaving a fixed positive ion behind. In p-type material, a group III acceptor (for example boron) has one fewer valence electron, so an electron is drawn from the valence band, leaving a mobile hole. The Fermi level shifts into the conduction band for n-type and into the valence band for p-type.",
      },
      {
        claim:
          "The Fermi level is the highest energy level occupied by electrons in the metal.",
        why:
          "That is true only at 0 K. At any temperature above absolute zero, states above the Fermi level are occupied with a probability given by the Fermi-Dirac distribution, and the occupancy at the Fermi level itself is one half.",
        correction:
          "At T = 0 K the Fermi level is the highest occupied state. At finite T, f(E) = 1/(exp((E - E_F)/kT) + 1), so f(E_F) = 1/2 and the occupancy falls away over an energy range of a few kT around E_F. For copper, E_F is about 7 eV while kT at room temperature is only about 0.026 eV, which is why the everyday description of a metal as a filled band with a sharp edge is a good approximation, whereas for a semiconductor with a 1.12 eV gap the same approximation fails completely.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Silicon has a band gap of 1.12 eV. Find the wavelength of the longest-wavelength photon that can excite a valence electron across the gap, and state whether visible light can do this.",
        answer:
          "The threshold photon energy is E = 1.12 eV. Using E = hc/lambda with hc = 1240 eV nm, lambda = 1240 / 1.12 = 1107 nm = 1.11 x 10^-6 m, in the near infrared. Visible light (about 380 to 750 nm) has photon energies of 3.3 to 1.65 eV, all above the 1.12 eV gap, so visible photons can excite electrons across the silicon gap - which is exactly why silicon solar cells respond to visible light and not to the infrared beyond 1.11 microns.",
      },
      {
        kind: "derivation",
        question:
          "Derive the temperature dependence of the intrinsic carrier concentration in a semiconductor, n = n_i = sqrt(N_C N_V) exp(-E_g / 2 k T), and explain the opposite trends for a metal and a semiconductor.",
        answer:
          "In an intrinsic semiconductor the number of thermally excited electrons equals the number of holes, n = p = n_i, and the mass action law np = n_i^2 holds. The effective densities of states in the conduction and valence bands are N_C = 2(2 pi m_e k T / h^2)^(3/2) and N_V = 2(2 pi m_h k T / h^2)^(3/2), each proportional to T^(3/2). The probability of an electron occupying a state just above the conduction band edge is exp(-E_g / 2 kT) by Boltzmann statistics, so n = sqrt(N_C N_V) exp(-E_g / 2 kT), which is proportional to T^(3/2) exp(-E_g / 2kT). The exponential factor dominates for a small band gap, so n rises steeply with temperature. In a metal the relevant electrons are already in the conduction band, and the effect of heating is to increase the lattice vibrations, so the mean free path and the conductivity fall. Hence the resistance of a metal rises with temperature while that of a semiconductor falls.",
      },
      {
        kind: "reasoning",
        question:
          "A superconductor has exactly zero resistance below a critical temperature. Explain what the Meissner effect adds to this statement, and why zero resistance alone is not enough to identify a superconductor.",
        answer:
          "Zero resistance says only that a current, once established, persists without decay. The Meissner effect says that when a material is cooled below its critical temperature it expels magnetic flux from its interior, so the field inside becomes zero except in a penetration depth of about 100 nm at the surface. This is a distinct thermodynamic property: a perfect conductor with zero resistance that was cooled in a field would keep that field trapped, while a superconductor expels it. Zero resistance is also not unique: a perfect conductor cooled in a field behaves the same way, and a low-resistance material such as copper at liquid-helium temperature has a resistance far below any measurement. Superconductivity is therefore identified by the combination of zero resistance and flux expulsion below a critical temperature, together with the critical field, the critical current and the critical temperature as separate limits.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Solids",
        href: "/class-11-notes/physics/chapters/solids",
      },
      {
        label: "Modern physics unit suite 3D",
        href: "/lab/ph-3d-modern-suite",
      },
      {
        label: "Modern physics theory lab",
        href: "/lab/ph-th-modern",
      },
    ],
  },

  "recent-trends-in-physics": {
    misconceptions: [
      {
        claim:
          "The Standard Model explains all four fundamental forces.",
        why:
          "It describes the electromagnetic, the strong and the weak interactions with remarkable precision, but gravity is not included, and the neutrino masses and the cosmological constant are not accommodated by the minimal model.",
        correction:
          "The Standard Model is a quantum field theory of the electromagnetic, weak and strong interactions; gravity is described separately by general relativity, and no verified quantum theory that includes gravity exists. Its predictions have been tested to extraordinary precision, and no confirmed deviation from it has been found, but it is not a theory of everything.",
      },
      {
        claim:
          "Antiparticles are exotic heavy partners created only in high-energy laboratories.",
        why:
          "The electron's antiparticle, the positron, is the same mass and is found in ordinary cosmic rays and in medical imaging. Every particle of matter has an antiparticle of the same mass.",
        correction:
          "For each particle there is an antiparticle of equal mass and opposite charge, lepton number and, for baryons, baryon number. The electron and positron annihilate into photons; quarks and antiquarks do the same, and mesons are themselves quark-antiquark pairs.",
      },
      {
        claim:
          "Because neutrinos were once thought to be massless, their detection in 2015 settled the question of their mass.",
        why:
          "Neutrino oscillation experiments showed that the flavours change along the flight, which requires the mass eigenstates to differ in mass, but the oscillation pattern measures differences of squared masses, not the masses themselves.",
        correction:
          "Oscillation experiments constrain the differences delta m^2, and the absolute scale is set by other data, principally the shape of the solar neutrino spectrum and the endpoint of electron-neutrino beta decay, as in KATRIN. The current bound is a neutrino mass below about 0.45 eV/c^2, and the ordering of the masses is still an open question.",
      },
    ],
    workbook: [
      {
        kind: "numerical",
        question:
          "Find the de Broglie wavelength of an electron accelerated through a potential difference of 100 V, and compare it with the wavelength of the same electron in its ground state in an atom.",
        answer:
          "The kinetic energy gained is e V = 100 eV = 1.602 x 10^-17 J, so the momentum is p = sqrt(2 m E) = sqrt(2 x 9.109 x 10^-31 x 1.602 x 10^-17) = sqrt(2.918 x 10^-47) = 5.40 x 10^-24 kg m/s, and the wavelength is lambda = h / p = 6.626 x 10^-34 / 5.40 x 10^-24 = 1.23 x 10^-10 m = 0.123 nm. This is comparable with atomic spacings, which is why the electron shows wave behaviour in the electron microscope. By contrast, the wavelength of an electron bound in an atom with an energy of a few electron volts is of the order of 0.1 to 0.3 nm, and for a nucleus of a few MeV it is of the order of 10^-15 m.",
      },
      {
        kind: "derivation",
        question:
          "Derive the photoelectric equation from Planck's hypothesis and Einstein's photon model, and state the threshold frequency.",
        answer:
          "Planck's hypothesis says that a blackbody radiates in quanta of energy E = h nu. Einstein proposed that light itself consists of photons of this energy. In the photoelectric effect an electron absorbs one photon, of energy h nu; part of this goes into the work required to escape from the metal, W = h nu_0, the work function, and the remainder becomes kinetic energy. Conservation of energy therefore gives h nu = W + (1/2) m v_max^2, which is the photoelectric equation. The threshold frequency is the frequency at which the electron just escapes with zero kinetic energy, nu_0 = W / h, so no emission occurs below it however intense the radiation. The equation also explains why the maximum kinetic energy depends on the frequency and not on the intensity, which is the classical prediction the wave theory cannot make.",
      },
      {
        kind: "reasoning",
        question:
          "Neutrino oscillation was discovered when the measured flux of electron neutrinos from the Sun was about one third of the expected value. Explain how this observation leads to the conclusion that neutrinos have mass, and what the observation does not tell you.",
        answer:
          "The deficit cannot be explained by loss of flux: the neutral-current measurements show that the total number of neutrinos arriving is essentially the expected one, so the electron neutrinos have changed into other flavours (muon and tau neutrinos), a process called oscillation. Oscillation requires the three neutrino mass eigenstates to have different masses, because the flavour states are superpositions of the mass eigenstates and the phases of the components evolve at different rates, so the probability of finding a given flavour depends on the distance travelled and on the differences of the squared masses. What the observation does not give is the absolute mass: the oscillation probability depends only on delta m^2, so any set of masses with the same differences fits the data equally well, and the absolute scale has to be fixed by other measurements. A further puzzle is the flavour ratio itself, which for the standard solar model should be about 1:2:0, but is measured as about 1:1:1.",
      },
    ],
    nextSteps: [
      {
        label: "Read the chapter notes: Recent Trends in Physics",
        href: "/class-11-notes/physics/chapters/recent-trends-in-physics",
      },
      {
        label: "Quantum 3D lab",
        href: "/lab/ph-3d-quantum",
      },
      {
        label: "Modern physics unit suite 3D",
        href: "/lab/ph-3d-modern-suite",
      },
    ],
  },
};
