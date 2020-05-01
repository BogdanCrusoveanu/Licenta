﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Licenta.API.Dtos
{
    public class SeminarForUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public int SemesterId { get; set; }
    }
}
