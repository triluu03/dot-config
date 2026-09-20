---Lazy plugin specification for diffview.
return {
	"sindrets/diffview.nvim",
	dependencies = { "nvim-lua/plenary.nvim", "nvim-tree/nvim-web-devicons" },
	config = function()
		local function get_main_branch()
			-- Determine the repo's default branch from its remote HEAD.
			local out = vim.fn.system("git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null")
			if vim.v.shell_error == 0 then
				local ref = vim.trim(out)
				if ref ~= "" then
					return ref
				end
			end

			-- Fall back to common default branch names that exist locally.
			for _, name in ipairs({ "origin/main", "origin/master" }) do
				vim.fn.system("git rev-parse --verify --quiet " .. name .. " 2>/dev/null")
				if vim.v.shell_error == 0 then
					return name
				end
			end

			return "origin/main"
		end

		vim.keymap.set("n", "<leader>gd", function()
			vim.cmd({ cmd = "DiffviewOpen", args = { get_main_branch() } })
		end, { desc = "Diffview: compare with default branch" })
		vim.keymap.set("n", "<leader>gc", function()
			vim.cmd("DiffviewClose")
		end, { desc = "Diffview: close the view" })
	end,
}
