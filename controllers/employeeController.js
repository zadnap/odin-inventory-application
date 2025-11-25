const db = require('../models/queries');

const renderEmployee = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const filters = {
            employeeNumber: req.query.employeeNumber || '',
            lastName: req.query.lastName || '',
            firstName: req.query.firstName || '',
            extension: req.query.jobTitle || '',
            email: req.query.email || '',
            officeCode: req.query.officeCode || '',
            reportsTo: req.query.reportsTo || '',
            jobTitle: req.query.jobTitle || ''
        }
        const isFiltering = Object.values(filters).some((v) => v);
        let employees;
        let totalItems;

        if (isFiltering) {
            employees = await db.getEmployees(page, filters);
            totalItems = await db.getEmployeeCount(filters);
        } else {
            employees = await db.getEmployees(page);
            totalItems = await db.getEmployeeCount();
        }

        const totalPages = Math.ceil(totalItems / db.PAGE_SIZE);
        res.render('employee-page', {
            employees,
            totalEmployees: totalItems,
            currentPage: page,
            totalPages,
            filters
        })
    } catch (error) {
        res.status(500).render('error-page', {message: error.message});
    }
}

const validateEmail = (email) => {
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const validateNumber = (value) => {
    return value !== undefined && value !== null && !isNaN(Number(value));
}

const addEmployee = async (req, res) => {
    try {
        const {
            employeeNumber,
            lastName,
            firstName,
            extension,
            email,
            officeCode,
            reportsTo,
            jobTitle
        } = req.body;

        if (!employeeNumber || !validateNumber(employeeNumber)) {
            return res.status(400).render('error-page', 'Invalid employee number');
        }
        if (!firstName || firstName.length > 50) {
            return res.status(400).render('error-page', 'Invalid first name');
        }
        if (!lastName || lastName.length > 50) {
            return res.status(400).render('error-page', 'Invalid last name');
        }
        if (!jobTitle || jobTitle.length > 50) {
            return res.status(400).render('error-page', 'Invalid job title');
        }
        if (!email || !validateEmail(email) || email.length > 100) {
            return res.status(400).render('error-page', 'Invalid email');
        }
        if (extension && extension.length > 10) {
            return res.status(400).render('error-page', 'Extension too long');
        }
        if (officeCode && officeCode.length > 10) {
            return res.status(400).render('error-page', 'Office code too long');
        }
        if (reportsTo && !validateNumber(reportsTo)) {
            return res.status(400).render('error-page', 'reportsTo must be a number');
        }

        await db.addNewEmployee({
            employeeNumber: Number(employeeNumber),
            lastName,
            firstName,
            extension: extension || null,
            email,
            officeCode: officeCode || null,
            reportsTo: reportsTo ? Number(reportsTo) : null,
            jobTitle,
        });

        res.redirect('/');
    } catch (error) {
        res.status(500).render('error-page', {message: error.message});
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employeeNumber = parseInt(req.body.employeeNumber);
        if (!employeeNumber) {
            return res.status(400).render('error-page', 'Invalid employee number');
        }

        await db.deleteEmployee(employeeNumber);

        res.redirect('/');
    } catch (error) {
        res.status(500).render('error-page', {message: error.message});
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {
            employeeNumber,
            lastName,
            firstName,
            extension,
            email,
            officeCode,
            reportsTo,
            jobTitle
        } = req.body;

        if (!employeeNumber || !validateNumber(employeeNumber)) {
            return res.status(400).render('error-page', 'Invalid employee number');
        }

        const updatedData = { employeeNumber };

        if (firstName !== undefined) {
            if (!firstName || firstName.length > 50)
                return res.status(400).render('error-page', 'Invalid first name');
            updatedData.firstName = firstName;
        }
        if (lastName !== undefined) {
            if (!lastName || lastName.length > 50)
                return res.status(400).render('error-page', 'Invalid last name');
            updatedData.lastName = lastName;
        }
        if (jobTitle !== undefined) {
            if (!jobTitle || jobTitle.length > 50)
                return res.status(400).render('error-page', 'Invalid job title');
            updatedData.jobTitle = jobTitle;
        }
        if (email !== undefined) {
            if (!email || !validateEmail(email) || email.length > 100)
                return res.status(400).render('error-page', 'Invalid email');
            updatedData.email = email;
        }
        if (extension !== undefined) {
            if (extension.length > 10)
                return res.status(400).render('error-page', 'Extension too long');
            updatedData.extension = extension || null;
        }
        if (officeCode !== undefined) {
            if (officeCode.length > 10)
                return res.status(400).render('error-page', 'Office code too long');
            updatedData.officeCode = officeCode || null;
        }
        if (reportsTo !== undefined) {
            if (reportsTo && !validateNumber(reportsTo))
                return res.status(400).render('error-page', 'reportsTo must be a number');
            updatedData.reportsTo = reportsTo ? Number(reportsTo) : null;
        }

        await db.updateEmployee(updatedData);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error-page', {message: error.message});
    }
}

module.exports = {
    renderEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee
}