# Start here

Follow this execution loop exactly. Keep one active task at a time; execute tasks sequentially only inside the currently approved phase.

1. Read `AGENTS.md` completely.
2. Read `SPEC.md` completely.
3. Read `IMPLEMENTATION_PLAN.md` completely.
4. Read `docs/implementation-progress.md` completely.
5. Inspect the repository without changing files and identify the first incomplete task in the currently approved phase.
6. Read that task's goal, dependencies, exact file scope, contracts, steps, checks, expected result, and phase gate. If any dependency is not satisfied, stop and report the blocker.
7. Mark only that task `in_progress` in the progress file. Execute only that task and modify only files listed by the active task. Do not install, research, refactor, or start adjacent work unless that task explicitly requires it.
8. Run every task-specific check. Read the complete output and do not claim success when any required check fails.
9. Update progress evidence with the task status, changed files, exact checks and results, evidence, limitations, commit state, and review date. Mark the task `completed` only after all required checks pass; otherwise use `blocked` or keep `in_progress` as appropriate.
10. If the task is completed and another unfinished task remains in the same phase, repeat steps 6–9 for that next task. If the phase is complete, run its phase gate, record the result, and stop for human review. Do not begin the next phase.

When a task is blocked, requires a file outside its listed scope, a design or scope change, a SPEC.md or key architecture-contract change, missing authority, an unavailable prerequisite, a required check that cannot run, or a document contradiction, stop before editing and request direction.

`npm run verify` is the final technical gate after the package scripts exist. It never authorizes multiple tasks in one pass and never replaces the active task's checks or human review.
