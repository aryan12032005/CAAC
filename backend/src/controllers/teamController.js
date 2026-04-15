import TeamMember from '../models/TeamMember.js';

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({});
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a team member
// @route   POST /api/team
// @access  Private/Admin
export const createTeamMember = async (req, res) => {
  const { name, designation, email, image, category } = req.body;

  try {
    const teamMember = new TeamMember({
      name,
      designation,
      email,
      image,
      category
    });

    const createdTeamMember = await teamMember.save();
    res.status(201).json(createdTeamMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeamMember = async (req, res) => {
  const { name, designation, email, image, category } = req.body;

  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      teamMember.name = name || teamMember.name;
      teamMember.designation = designation || teamMember.designation;
      teamMember.email = email || teamMember.email;
      teamMember.image = image || teamMember.image;
      teamMember.category = category || teamMember.category;

      const updatedTeamMember = await teamMember.save();
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      await teamMember.deleteOne();
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
