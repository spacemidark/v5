# Editorial and technical review checklist

Use this before publishing a component as `reviewed`:

- Every material claim is qualified for engine/stage, temperature and load environment.
- Every equation includes assumptions, units and a known range of applicability.
- Aerodynamic design terms define sign conventions and reference frames.
- Illustrative drawings are explicitly labelled as schematics.
- Components and interfaces are consistent: fixed stator hardware is not assumed to contain VSV actuation hardware.
- No invented OEM dimensions, proprietary drawings, unspecified alloys or operating limits.
- Section reference IDs match entries in `src/data/catalog.json` and URLs are checked.
- Images are original, public domain, or licensed for the intended use; image credit included.
- TR and EN versions agree technically, including all numeric examples.
- For true engineering use, obtain domain review (aero, mechanical, structures, materials, manufacturing).

**Status convention:** `draft` = educational working content; `reviewed` = editorially checked by the project team; `planned` = no content. `reviewed` is not a claim of regulatory or engine-maker certification.
